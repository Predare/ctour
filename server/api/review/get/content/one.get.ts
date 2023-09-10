import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);
  
  if(!query.link || !query.authorId) return {status: 404};
  
  async function getReview() {
    return await prisma.review.findFirst({
      where: {
        film: { link: String(query.link) },
        authorId: String(query.authorId),
      },
      select: {
        id: true,
        text: true,
        rating: true,
      }
    });
  }

  var review: any;
  await getReview().then(async response => {
    review = response
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

  return review;
})