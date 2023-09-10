import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = new PrismaClient();
  var result: any = null;
  const session = await getServerSession(event);

  async function create() {
    return await prisma.comment.create({
      data: {
        text: body.text,
        review: {
          connect: {
            id: Number(event.context.params?.id)
          }
        },
        user: {
          connect: {
            email: session?.user.email,
          },
        }
      },
      include: {
        user: { include: { rank: true } },
      }
    });
  }

  await create().then(async response => {
    result = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  return {
    id: result.id, text: result.text, createdAt: result.createdAt, user: {id: result.user.id, name: result.user.name, avatar: result.user.avatar, color: result.user.color,
    rank: { name: result.user.rank.name, color: result.user.rank.color}}, 
    _count: { negativeVotes: 0, positiveVotes: 0 }, voteStatus: 0,
  };
})