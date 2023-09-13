import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    var result: any;

    async function getRandomFilm() {
        return await prisma.$queryRaw`SELECT * FROM "Film" ORDER BY RANDOM() LIMIT 1;`;
    }

    await getRandomFilm().then(async response => {
        result = response;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });
    
    return result[0].link;
})