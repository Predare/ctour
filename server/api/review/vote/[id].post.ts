import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);
    const body = await readBody(event);

    //Валидируем статус-голос чтобы не меняли рейтинг больше чем на одну единицу 
    if (body.status != 1 && body.status != -1) {
        return { status: false };
    }


  async function getReview() {
    return await prisma.review.findFirst({
      where: { id: Number(event.context.params?.id) },
      select: {
        authorId: true,
      }
    });
  }

    if ((await getReview())?.authorId === session?.user.id) {
        return { status: false };
    }

    async function addVote() {
        return await prisma.vote.upsert({
            where: {
                ['reviewId_userId']: {
                    reviewId: Number(event.context.params?.id),
                    userId: session?.user.id
                }
            },
            create: {
                review: {
                    connect: { id: Number(event.context.params?.id) }
                },
                user: { connect: { id: session?.user.id } },
                status: body.status,
            },
            update: { status: body.status, },
        })
    }

    async function groupVotes() {
        return await prisma.vote.groupBy({
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