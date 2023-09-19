import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  //Валидируем статус-голос чтобы не меняли рейтинг больше чем на одну единицу 
  if(body.status != 1 && body.status != -1) {
    return { status: false };
  }

  async function getComment() {
    return await db.comment.findFirst({
      where: { id: Number(event.context.params?.id) },
      select: {
        userId: true,
      }
    });
  }

  if((await getComment())?.userId === session?.user.id) {
    return { status: false };
  }
  async function upsert() {
    var request = {};
    request = await db.vote.upsert({
      where: {
        ['commentId_userId']: {
          commentId: Number(event.context.params?.id),
          userId: session?.user.id
        }
      },
      create: {
        comment: {
          connect: { id: Number(event.context.params?.id) }
        },
        user: { connect: { id: session?.user.id } },
        status: body.status,
      },
      update: { status: body.status, },
    });
    return request;
  }

  async function groupCommentVotes() {
    return await db.vote.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      where: {
        commentId: Number(event.context.params?.id),
      }
    })
  }
  
  await upsert().then(async response => {
    await db.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
  });

  const groupCommentVotesResult = await groupCommentVotes();
  return { 
    status: true, 
    positiveCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === 1)?._count?.id ?? 0, 
    negativeCount: groupCommentVotesResult.find(groupedCommentVote => groupedCommentVote.status === -1)?._count?.id ?? 0, 
  };
})