import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(event);
  var result: any = { users: null, reviews: null };
  var users: any = [];
  var reviews: any = [];

  async function findMany() {
    return await prisma.user.findMany({
      where: {
        followers: {
          some: {
            id: event.context.params?.id
          },
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        color: true,
        reviews: {
          take: 5,
          select: {
            id: true,
            votes: {
              where: {
                userId: event.context.params?.id
              }
            },
            film: {
              select: {
                name: true,
                genres: true,
                yearStart: true,
                link: true,
              },
            }
          }
        },
        _count: {
          select: {
            followers: true,
            reviews: true,
          }
        }
      }
    })
  }

  await findMany().then(async response => {
    users = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  await findReviews().then(async response => {
    reviews = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  async function findReviews() {
    return await prisma.review.findMany({
      where: {
        author: {
          followers: {
            some: {
              id: event.context.params?.id
            }
          }
        }
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
    })
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

  result['users'] = users;
  result['reviews'] = reviews.map((review: { id: any; }) => {
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