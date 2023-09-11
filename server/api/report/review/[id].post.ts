import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const prisma = new PrismaClient();
    const session = await getServerSession(event);

    async function create() {
        return await prisma.report.create({
            data: {
                review: {connect: {id: Number(event.context.params?.id)}},
                text: body.text,
                author: {connect: {email: session?.user.email}},
            },
        });
    }

    await create().catch(e => {console.error(e); return {status: false}}).then(async response => {
        return { status: true };
    });
    return { status: true };
})