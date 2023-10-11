import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    var result;
    async function unsubscribe() {
        return await db.user.update({
            where: {
                name: event.context.params?.name
            },
            data: {
                followers: {
                    disconnect: {
                        name: session?.user?.name,
                    }
                }
            },
            select: {
                _count: {
                    select: {
                        followers: true,
                    }
                }
            }
        })
    }

    await unsubscribe().then(async response => {
        result = response;
    });
    
    return {status: true, user : result};
})