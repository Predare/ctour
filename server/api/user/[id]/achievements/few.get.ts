import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    var result: any;
    async function findMany() {
        return await prisma.achievement.findMany({
            where: {
                completedUsers: {
                    none: {
                        id: event.context.params?.id
                    }
                }
            },
            select: {
                id: true,
                icon: true,
                name: true,
                description: true,
                reward: true,
            }
        })
    }

    await findMany().then(async response => {
        result = response;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })

    return result;
})