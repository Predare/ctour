import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    const body = await readBody(event);

    //Валидируем статус-голос чтобы не меняли рейтинг больше чем на одну единицу 
    if (body.status != 1 && body.status != -1) {
        return { status: false };
    }


  async function getReview() {
    return await db.review.findFirst({
      where: { id: Number(event.context.params?.id) },
      select: {
        authorName: true,
      }
    });
  }

    if ((await getReview())?.authorName === session?.user.name) {
        return { status: false };
    }

    async function addVote() {
        return await db.vote.upsert({
            where: {
                ['reviewId_userId']: {
                    reviewId: Number(event.context.params?.id),
                    userNae: session?.user.name
                }
            },
            create: {
                review: {
                    connect: { id: Number(event.context.params?.id) }
                },
                user: { connect: { name: session?.user.name } },
                status: body.status,
            },
            update: { status: body.status, },
        })
    }

    async function groupVotes() {
        return await db.vote.groupBy({
          by: ['status'],
          _count: {
            id: true
          },
          where: {
            reviewId: Number(event.context.params?.id),
          }
        })
      }

    await addVote();
    
    const groupCommentVotesResult = await groupVotes();
    return { 
      status: body.status, 
      positiveCount: groupCommentVotesResult.find(groupedVote => groupedVote.status === 1)?._count?.id ?? 0, 
      negativeCount: groupCommentVotesResult.find(groupedVote => groupedVote.status === -1)?._count?.id ?? 0, 
    };
})