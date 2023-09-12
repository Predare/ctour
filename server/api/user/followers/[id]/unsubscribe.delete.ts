import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);
    var result: any;
    async function unsubscribe() {
        return await prisma.user.update({
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
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    
    return result;
})