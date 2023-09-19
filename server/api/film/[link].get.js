import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  var result;

  async function findUser() {
    return await db.user.findFirst({
      where: { email: session?.user?.email }
    });
  }

  await findUser().then(async response => {
    result = response;
  })

  async function findOne() {
    return await db.film.findFirst({
      where: { link: String(event.context.params?.link) },
      include: {
        selections: true,
        genres: true,
        actors: true,
        directors: true,
        voice: true,
        country: true,
        _count: {
          select: {
            favoritedByUsers: {
              where: {
                id: session?.user?.id,
              }
            }
          }
        }
      }
    });
  }

  await findOne().then(async response => {
    result = response;
  });

  return result;
})