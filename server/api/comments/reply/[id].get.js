import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    var result;
    async function findMany() {
        const comments = await db.comment.findMany({
            where: {
                replyCommentId: Number(event.context.params?.id),
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
                replyCommentId: true,
            },
            orderBy: {
                createdAt: 'desc'
            },
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

        return { comments: result };
    }

    await findMany().then(async response => {
        result = response;
    });
    return result;
})