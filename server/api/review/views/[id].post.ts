import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(event);

    async function checkView() {
        return await prisma.views.findFirst({
            where: {
                reviewId: Number(event.context.params?.id),
                userId: session?.user.id,
            }
        });
    }

    const viewExist: boolean = await checkView() ? true : false;

    if (viewExist) {
        return null;
    }

    async function addView() {
        return await prisma.views.create({
            data: {
                user: { connect: { id: session?.user.id } },
                review: {
                    connect: {
                        id: Number(event.context.params?.id)
                    },
                },
            }
        });
    }

    async function addViewCount() {
        return await prisma.review.update({
            where: {
                id: Number(event.context.params?.id)
            },
            data: {
                viewsCount: {
                    increment: 1
                }
            },
            select: {
                viewsCount: true
            }
        });
    }

    await addView();
    var review: any = await addViewCount();

    return review;
})