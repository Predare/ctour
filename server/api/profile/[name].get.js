import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  
  const profileName = event.context.params?.name != undefined ? event.context.params?.name : session?.user?.name;
  async function findUser() {
    return await db.user.findFirst({
      where: { name: profileName },
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
    return await db.vote.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      where: {
        userName: profileName,
      }
    })
  }
  const groupCommentVotesResult = await groupCommentVotes();

  var user = null;
  await findUser().then(async response => {
    user = response;
    await db.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
  });

  async function userRating(user) {
    return await db.vote.aggregate({
      where: {
        comment: {
          userName: user.name,
        },
      },
      _sum: {
        status: true,
      }
    });
  }

  async function criticRating(user) {
    return await db.vote.aggregate({
      where: {
        review: {
          authorName: user.name,
        },
      },
      _sum: {
        status: true,
      }
    });
  }

  async function findFewUncompletedAchievements() {
    return await db.achievement.findMany({
        where: {
            completedUsers: {
                none: {
                  name: event.context.params?.name
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