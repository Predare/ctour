import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(event)
  var result;

  async function findUser() {
    return await prisma.user.findFirst({
      where: { email: session?.user?.email }
    });
  }

  await findUser().then(async response => {
    result = response;
  })

  async function findOne() {
    return await prisma.film.findFirst({
      where: { link: String(event.context.params?.link) },
      include: {
        selections: true,
        genres: true,
        actors: true,
        directors: true,
        voice: true,
        country: true
      }
    });
  }

  await findOne().then(async response => {
    result = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  return result;
})