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
        film: {
          connect: {
            id: body.filmId
          }
        },
        user: {
          connect: {
            email: session?.user.email,
          },
        }
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
    id: result.id, name: result.name, text: result.text, avatar: result.avatar, color: result.color, createdAt: result.createdAt,
    _count: { negativeVotes: 0, positiveVotes: 0 }, voteStatus: 'NEUTRAL',
  };
})