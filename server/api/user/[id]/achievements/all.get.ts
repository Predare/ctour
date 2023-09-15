import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const query = getQuery(event);
    var cursor: number | undefined = Number(query.cursor);
    var elementsInPage = 5;

    async function getAchievements() {
        return await prisma.achievement.findMany({
            select: {
                id: true,
                name: true,
                icon: true,
                description: true,
                reward: true,
                _count: {
                    select: {
                        completedUsers: {
                            where: {
                                id: event.context.params?.id
                            }
                        }
                    }
                }
            },
            orderBy: {
                reward: 'asc',
            },
            take: elementsInPage + 1,
            skip: cursor ? 1 : 0,
            cursor: cursor ? {
                id: cursor
            } : undefined,
        });
    }

    var result: any;
    await getAchievements().then(async response => {
        result = response;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    var newCursor = result.length === elementsInPage + 1 ? result[result.length - 2].id : -1;
    if (newCursor != -1) result.pop();

    return { achievements: result, cursor: newCursor};
})