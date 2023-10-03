import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import Yandex from 'next-auth/providers/yandex';

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from '~/utils/db.server';

export default NuxtAuthHandler({
    adapter: PrismaAdapter(db),
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: 'a5d797fe1da8d650c895',
            clientSecret: 'fd496972eafa3d3c4cc462d9bb9bc17b5ca0d090',
        }),
        Yandex.default({
            clientId: '22086a42a4f8403881fcbeb87cb4ce87',
            clientSecret: '052d9d21b0c54d4b96cd9aa2f135d14e',
        }),
    ],
    callbacks: {
        session: async ({ session, token, user }) => {
            session.user.id = user.id;
            return session;
        },
        async signIn({ user, account, profile }) {
            var name;
            do {
                name = generateName();
            } while (!checkNameExist(name))
            user.name = name;
            return Promise.resolve(true);
        }
    },
    events: {
        async createUser(message) {
            giveRankToUser(message.user);
        }
    },
});

async function checkNameExist(name) {
    return await db.user.findFirst({ where: { name } })
}

function generateName() {
    const name = `Holy-Cow-` + getRandomNumber(1, 9999999999);
    return name;
}

async function giveRankToUser(user) {
    return await db.user.update({
        where: { id: user.id },
        data: { rank: { connect: { id: (await getZeroRank()).id } }, nextRank: { connect: { id: (await getNextRank()).id } } }
    });
}

async function getZeroRank() {
    return await db.rank.findFirst({ where: { requiredExpirence: 0 } });
}

async function getNextRank() {
    return (await db.rank.findMany({ where: { requiredExpirence: { gt: 0 } }, orderBy: { requiredExpirence: 'asc' }, take: 1 }))[0];
}

function getRandomNumber(min, max) {
    // Calculate the range of the numbers
    const range = max - min;

    // Generate a random number within the range
    const randomNumber = Math.random() * range;

    // Adjust the random number to be within the desired range and return it
    return Math.floor(randomNumber) + min;
}