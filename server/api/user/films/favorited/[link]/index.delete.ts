import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);

    async function remove() {
        return await prisma.film.update({
            where: { link: event.context.params?.link },
            data: {
                favoritedByUsers: {disconnect: {id: session?.user?.id}}
            },
        });
    }

    await remove().catch(e => {console.error(e); return {status: false}}).then(async response => {
        return { status: true };
    });
    return { status: true };
})