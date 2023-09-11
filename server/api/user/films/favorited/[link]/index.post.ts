import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);

    async function create() {
        return await prisma.film.update({
            where: { link: event.context.params?.link },
            data: {
                favoritedByUsers: {connect: {id: session?.user?.id}}
            },
        });
    }

    await create().catch(e => {console.error(e); return {status: false}}).then(async response => {
        return { status: true };
    });
    return { status: true };
})