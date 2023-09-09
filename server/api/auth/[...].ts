import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import Yandex from 'next-auth/providers/yandex';

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default NuxtAuthHandler({
    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: 'a5d797fe1da8d650c895',
           clientSecret: 'fd496972eafa3d3c4cc462d9bb9bc17b5ca0d090'
        }),
        Yandex.default({
            clientId: '22086a42a4f8403881fcbeb87cb4ce87',
            clientSecret: '052d9d21b0c54d4b96cd9aa2f135d14e',
        }),
    ],
    callbacks: {
        session: async ({ session, token, user }) => {
            session.user.avatar = user.avatar;
            session.user.color = user.color;
            session.user.id = user.id;
            return session;
        },
    }
});
