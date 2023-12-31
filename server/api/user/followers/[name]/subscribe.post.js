import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    var result;
    
    if(event.context.params?.name == session?.user?.name) return {status: false};

    async function subscribe() {
        return await db.user.update({
            where: {
                name: event.context.params?.name
            },
            data: {
                followers: {
                    connect: {
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

    await subscribe().then(async response => {
        result = response;
    });
    
    return {status: true, user: result};
})