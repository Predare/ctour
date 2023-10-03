import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
    if(await db.rank.count() != 0) return; // если нет рангов в базе, то создаем
    console.log("Start rank seeding ...");
    await db.rank.createMany({
        data: [
            {
                name: "Новичок",
                requiredExpirence: 0,
                color: "green",
            },
            {
                name: "Начинающий",
                requiredExpirence: 100,
                color: "yellow",
            },
            {
                name: "Продвинутый",
                requiredExpirence: 500,
                color: "orange",
            },
        ],
    });
    console.log("Seeding rank finished.");
}

main().then(async () => {
    await db.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
})