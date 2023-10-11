import { db } from '~/utils/db.server';
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    async function checkView() {
        return await db.views.findFirst({
            where: {
                reviewId: Number(event.context.params?.id),
                userName: session?.user.name,
            }
        });
    }

    const viewExist = await checkView() ? true : false;

    if (viewExist) {
        return null;
    }

    async function addView() {
        return await db.views.create({
            data: {
                user: { connect: { name: session?.user.name } },
                review: {
                    connect: {
                        id: Number(event.context.params?.id)
                    },
                },
            }
        });
    }

    async function addViewCount() {
        return await db.review.update({
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
    var review = await addViewCount();

    return review;
})