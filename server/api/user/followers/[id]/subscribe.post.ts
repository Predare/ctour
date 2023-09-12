import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);
    var result: any;
    
    if(event.context.params?.id == session?.user?.id) return {status: false};

    async function subscribe() {
        return await prisma.user.update({
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
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    
    return result;
})