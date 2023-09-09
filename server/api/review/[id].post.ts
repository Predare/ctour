import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = new PrismaClient();
  const session = await getServerSession(event);

  async function upsertReview() {
    return await prisma.review.upsert({
      where: {
        ['filmId_authorId']: {
          filmId: Number(event.context.params?.id),
          authorId: session?.user.id
        },
      },
      create: {
        author: {
          connect: {
            email: session?.user.email,
          },
        },
        text: body.text,
        film: {
          connect: {
            id: Number(event.context.params?.id)
          }
        },
      },
      update: {
        text: body.text,
      }

    });
  }

  var result;
  await upsertReview().then(async response => {
    result = response
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
  return { status: true };
})