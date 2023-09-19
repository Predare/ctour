import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    var result;
    async function unsubscribe() {
        return await db.user.update({
            where: {
                id: event.context.params?.id
            },
            data: {
                followers: {
                    disconnect: {
                        id: session?.user?.id,
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