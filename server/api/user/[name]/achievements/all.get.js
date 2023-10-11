import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    var cursor = Number(query.cursor);
    var elementsInPage = 5;

    async function getAchievements() {
        return await db.achievement.findMany({
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
                                name: event.context.params?.name
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

    var result;
    await getAchievements().then(async response => {
        result = response;
    });
    var newCursor = result.length === elementsInPage + 1 ? result[result.length - 2].id : -1;
    if (newCursor != -1) result.pop();

    return { achievements: result, cursor: newCursor};
})