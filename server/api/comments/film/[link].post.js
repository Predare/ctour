import { AchievementTarget } from "@prisma/client";
import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  var result = null;
  const session = await getServerSession(event);

  async function create() {
    return await db.comment.create({
      data: {
        text: body.text,
        film: {
          connect: {
            link: event.context.params?.link
          }
        },
        user: {
          connect: {
            email: session?.user.email,
          },
        }
      },
      include: {
        user: {
          include: { rank: true, _count: { select: { comments: true } } },
        },
      }
    });
  }

  await create().then(async response => {
    result = response;
    await db.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
  })

  async function findCompletedAchievements() {
    return await db.achievement.findFirst({
      where: {
        target: AchievementTarget.CommentAmount,
        targetAmount: { lte: result.user._count.comments},
        completedUsers: {
          none: {
            id: session?.user.id
          }
        }
      },
      select: {
        id: true
      }
    })
  }

  async function updateUserAchievements() {
    var completeAchivements = await findCompletedAchievements();
    if(!completeAchivements) return null;
    await db.user.update({
      where: {
        id: session?.user.id
      },
      data: {
        completedAchievements: {
          connect: {id: completeAchivements?.id}
        },
      },
    });
    return completeAchivements?.id;
  }

  return {
    id: result.id, text: result.text, createdAt: result.createdAt, user: {
      id: result.user.id, name: result.user.name, avatar: result.user.avatar, color: result.user.color,
      rank: { name: result.user.rank.name, color: result.user.rank.color }
    },
    _count: { negativeVotes: 0, positiveVotes: 0 }, voteStatus: 0,
    completedAchievements: await updateUserAchievements(),
  };
})