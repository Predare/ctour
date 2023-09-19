import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    async function create() {
        return await db.film.update({
            where: { link: event.context.params?.link },
            data: {
                viewedByUsers: {connect: {id: session?.user?.id}}
            },
        });
    }

    await create().catch(e => {console.error(e); return {status: false}}).then(async response => {
        return { status: true };
    });
    return { status: true };
})