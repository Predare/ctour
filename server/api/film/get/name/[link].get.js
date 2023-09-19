import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  var result;
   async function getName() {
     return await db.film.findFirst({
       where: { link: event.context.params?.link },
       select: {
         name: true,
       }
     });
   }

  await getName().then(async response => {
    result = response;
  });

  return result;
})