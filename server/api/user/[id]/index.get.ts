import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    var result: any;
    async function findFirst() {
        return await prisma.user.findFirst({
            where: {
                id: event.context.params?.id
            },
            select: {
                id: true,
                avatar: true,
                color: true,
                name: true,
                rank: {
                    select: {
                        name: true,
                        color: true,
                    },
                },
            }
        })
    }

    await findFirst().then(async response => {
        result = response;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })

    return result;
})