import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(event);

  const profileId = event.context.params?.id != undefined ? event.context.params?.id : session?.user?.id;

  async function findUser() {
    return await prisma.user.findFirst({
      where: { id: profileId },
      select: {
        id: true,
        expirence: true,
        nextRank: true,
        rank: true,
        createdAt: true,
        avatar: true,
        color: true,
        name: true,
        _count: {
          select: {
            followers: true,
            subscribes: true,
            reviews: true,
          },
        }
      },
    });
  }

  async function groupCommentVotes() {
    return await prisma.vote.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      where: {
        userId: profileId,
      }
    })
  }
  const groupCommentVotesResult = await groupCommentVotes();

  var user: any = null;
  await findUser().then(async response => {
    user = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

  async function userRating(user: any) {
    return await prisma.vote.aggregate({
      where: {
        comment: {
          userId: user.id,
        },
      },
      _sum: {
        status: true,
      }
    });
  }

  async function criticRating(user: any) {
    return await prisma.vote.aggregate({
      where: {
        review: {
          authorId: user.id,
        },
      },
      _sum: {
        status: true,
      }
    });
  }

  async function findFewUncompletedAchievements() {
    return await prisma.achievement.findMany({
        where: {
            completedUsers: {
                none: {
                    id: event.context.params?.id
                }
            }
        },
        select: {
            id: true,
            icon: true,
            name: true,
            description: true,
            reward: true,
        }
    })
}

var achievements;
  await findFewUncompletedAchievements().then(async response => {
    achievements = response;
    await prisma.$disconnect();
  })

  return {
    ...user,
    positiveVotesCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === 1)?._count?.id ?? 0,
    negativeVotesCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === -1)?._count?.id ?? 0,
    rating: (await userRating(user))._sum.status ?? 0,
    criticRating: (await criticRating(user))._sum.status ?? 0,
    achievements: achievements,
  };
})