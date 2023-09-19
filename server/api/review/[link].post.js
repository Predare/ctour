import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  const link  = event.context.params?.link;
  if(!link) return {status: 404};
  if(body.rating != 1 || body.rating !=1) return {status: 400};

  async function upsertReview() {
    return await db.review.upsert({
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
    result = response;
  });
  return { status: true };
})