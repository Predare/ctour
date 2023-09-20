

import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  var result;

  var elementsInPage = 5;
  async function findMany() {
    const query = getQuery(event);
    var cursor = Number(query.cursor);
    const comments = await db.comment.findMany({
      where: {
        filmLink: event.context.params?.link
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            avatar: true,
            color: true,
            name: true,
            rank: {
              select: {
                name: true,
                color: true,
              },
            }
          },
        },
        _count: {
          select: {
            subComments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: elementsInPage + 1,
      skip: cursor && cursor != -1 ? 1 : 0,
      cursor: cursor && cursor != -1 ? {
        id: cursor
      } : undefined,
    });

    async function groupCommentVotes() {
      return await db.vote.groupBy({
        by: ['commentId', 'status'],
        _count: {
          id: true
        },
        where: {
          commentId: { in: comments.map(comment => comment.id) },
        }
      })
    }

    const groupedCommentVotes = await groupCommentVotes();

    const userVotes = await db.vote.findMany({
      where: {
        commentId: { in: comments.map(comment => comment.id) },
        userId: session?.user.id,
      },
    });

    const result = comments.map((comment) => {
      return {
        ...comment,
        voteStatus: userVotes.find(userVote => userVote.userId === session?.user.id && userVote.commentId === comment.id)?.status ?? 0,
        positiveVotes: groupedCommentVotes.find(groupedCommentVote => groupedCommentVote.commentId === comment.id
          && groupedCommentVote.status === 1)?._count?.id ?? 0,
        negativeVotes: groupedCommentVotes.find(groupedCommentVote => groupedCommentVote.commentId === comment.id
          && groupedCommentVote.status === -1)?._count?.id ?? 0,
      }
    });

    var newCursor = result.length === elementsInPage + 1 ? result[result.length - 2].id : -1;
    if (newCursor != -1) result.pop();
    return { comments: result, cursor: newCursor };
  }

  await findMany().then(async response => {
    result = response;
  });

  return result;
})