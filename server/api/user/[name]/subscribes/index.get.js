import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  var result = { users: null, reviews: null };
  var users = [];
  var reviews = [];

  async function findMany() {
    return await db.user.findMany({
      where: {
        followers: {
          some: {
            name: event.context.params?.name
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
            rating: true,
            votes: {
              where: {
                userName: event.context.params?.name
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
  });

  await findReviews().then(async response => {
    reviews = response;
  });

  async function findReviews() {
    return await db.review.findMany({
      where: {
        author: {
          followers: {
            some: {
              name: event.context.params?.name
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
                name: session?.user?.name
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
    return await db.vote.groupBy({
      by: ['reviewId', 'status'],
      _count: {
        id: true
      },
      where: {
        reviewId: { in: reviews.map((review) => review.id) },
      }
    })
  }

  const groupedVotes = await groupVotes();

  const userVotes = await db.vote.findMany({
    where: {
      reviewId: { in: reviews.map((review) => review.id) },
      userName: session?.user.name,
    },
  });

  result['users'] = users;
  result['reviews'] = reviews.map((review) => {
    return {
      ...review,
      voteStatus: userVotes.find(vote => vote.userName === session?.user.name && vote.reviewId === review.id)?.status ?? 0,
      positiveVotes: groupedVotes.find(groupedVote => groupedVote.reviewId === review.id
        && groupedVote.status === 1)?._count?.id ?? 0,
      negativeVotes: groupedVotes.find(groupedVote => groupedVote.reviewId === review.id
        && groupedVote.status === -1)?._count?.id ?? 0,
    }
  });
  result['subscribed'] = true;

  return result;
})