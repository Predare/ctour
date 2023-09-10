import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  var result: any;
   async function getName() {
     return await prisma.film.findFirst({
       where: { link: event.context.params?.link },
       select: {
         name: true,
       }
     });
   }

  await getName().then(async response => {
    result = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  return result;
})