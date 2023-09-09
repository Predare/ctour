import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = new PrismaClient();
  const session = await getServerSession(event);

  const link: any  = event.context.params?.link;
  if(!link) return {status: 404};
  async function upsertReview() {
    return await prisma.review.upsert({
      where: {
        'filmLink_authorId': {
          filmLink: link,
          authorId: session?.user.id,
        }
      },
      create: {
        author: {
          connect: {
            email: session?.user.email,
          },
        },
        text: body.text,
        rating: body.rating,
        film: {
          connect: {
            link: link
          }
        },
      },
      update: {
        text: body.text,
        rating: body.rating,
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