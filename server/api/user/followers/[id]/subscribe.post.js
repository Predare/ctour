import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    var result;
    
    if(event.context.params?.id == session?.user?.id) return {status: false};

    async function subscribe() {
        return await db.user.update({
            where: {
                id: event.context.params?.id
            },
            data: {
                followers: {
                    connect: {
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

    await subscribe().then(async response => {
        result = response;
    });
    
    return {status: true, user: result};
})