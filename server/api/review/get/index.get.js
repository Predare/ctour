import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const session = await getServerSession(event);
  const where = {};

  if(query.authorId) where['authorId'] = query.authorId;
  if(query.filmLink) where['filmLink'] = query.filmLink;

  async function getSingle() {
    return await db.review.findFirst({
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
        film: {
          select: {
            name: true
          }
        },
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
    return await db.review.findMany({
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

  var reviews;
  if(query.single){
    await getSingle().then(async response => {
      reviews = [response];
    });
  }else{
    await getReviews().then(async response => {
      reviews = response;
    });
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
      userId: session?.user.id,
    },
  });

  const result = reviews.map((review) => {
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