import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);

  const where: any = query.filmId ? { filmId: Number(query.filmId) } : {authorId: query.authorId};
  
  async function getReviews() {
    return await prisma.review.findMany({
      where: where,
      select: {
        id: true,
        createdAt: true,
        text: true,
        rating: true,
        author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              color: true
            }
        },
      }
    });
  }

  var result;
  await getReviews().then(async response => {
    result = response
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
  return result;
})