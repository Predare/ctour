import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  var result;

  async function findAll() {
    return await prisma.genre.findMany({});
  }

  await findAll().then(async response => {
    result = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

  return result;
})