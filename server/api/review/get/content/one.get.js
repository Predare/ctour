import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  if(!query.link || !query.authorId) return {status: 404};
  
  async function getReview() {
    return await db.review.findFirst({
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

  var review;
  await getReview().then(async response => {
    review = response
  });

  return review;
})