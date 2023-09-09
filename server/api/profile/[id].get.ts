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
    return await prisma.commentVote.groupBy({
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

  var user : any = null;
  await findUser().then(async response => {
    user = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

  async function userRating(user: any) {
    return await prisma.commentVote.aggregate({
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

  return {
    ...user,
    positiveVotesCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === 1)?._count?.id ?? 0,
    negativeVotesCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === -1)?._count?.id ?? 0,
    rating: (await userRating(user))._sum.status ?? 0,
  };
})