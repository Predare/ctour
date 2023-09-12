import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);
  const session = await getServerSession(event);
  const where: any = query.filmLink ? { filmLink: query.filmLink } : {authorId: query.authorId};

  async function getSingle() {
    return await prisma.review.findFirst({
      where: {
        filmLink: String(query.filmLink),
        authorId: String(query.authorId),
      },
      select: {
        id: true,
        createdAt: true,
        text: true,
        rating: true,
        viewsCount: true,
        filmLink: true,
        _count: {
          select: {
            comments: true,
          }
        },
        author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              color: true,
              followers: {
                where: {
                  id: session?.user?.id
                },
                select: {
                  id: true,
                }
              },
              _count: {
                select: {
                  reviews: true,
                  followers: true,
                },
              }
            },
        },
      }
    })
  }

  async function getReviews() {
    return await prisma.review.findMany({
      where: where,
      select: {
        id: true,
        createdAt: true,
        text: true,
        rating: true,
        viewsCount: true,
        filmLink: true,
        _count: {
          select: {
            comments: true
          }
        },
        author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              color: true,
              followers: {
                where: {
                  id: session?.user?.id
                },
                select: {
                  id: true,
                }
              },
              _count: {
                select: {
                  reviews: true,
                  followers: true,
                },
              }
            },
        },
      }
    });
  }

  var reviews: any;
  if(query.signle){
    await getSingle().then(async response => {
      reviews = response
      await prisma.$disconnect();
    }).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  }else{
    await getReviews().then(async response => {
      reviews = response
      await prisma.$disconnect();
    }).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  }

  async function groupVotes() {
    return await prisma.vote.groupBy({
      by: ['reviewId', 'status'],
      _count: {
        id: true
      },
      where: {
        reviewId: { in: reviews.map((review: { id: any; }) => review.id) },
      }
    })
  }

  const groupedVotes = await groupVotes();

  const userVotes = await prisma.vote.findMany({
    where: {
      reviewId: { in: reviews.map((review: { id: any; }) => review.id) },
      userId: session?.user.id,
    },
  });

  const result = reviews.map((review: { id: any; }) => {
    return {
      ...review,
      voteStatus: userVotes.find(vote => vote.userId === session?.user.id && vote.reviewId === review.id)?.status ?? 0,
      positiveVotes: groupedVotes.find(groupedVote => groupedVote.reviewId === review.id
        && groupedVote.status === 1)?._count?.id ?? 0,
      negativeVotes: groupedVotes.find(groupedVote => groupedVote.reviewId === review.id
        && groupedVote.status === -1)?._count?.id ?? 0,
    }
  });
  return result;
})