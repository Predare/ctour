import { PrismaClient } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = new PrismaClient();

  var result: any = null;

  const colors = [
    '#EF9A9A',
    '#F48FB1',
    '#CE93D8',
    '#B39DDB',
    '#9FA8DA',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#80CBC4',
    '#A5D6A7',
    '#C5E1A5',
    '#E6EE9C',
  ];

  const session = await getServerSession(event);

  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async function create() {
    return await prisma.comment.create({
      data: {
        text: body.text,
        film: {
          connect: {
            id: body.filmId
          }
        },
        user: {
          connect: {
            email: session?.user.email,
          },
        }
      }
    });
  }

  await create().then(async response => {
    result = response;
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })

  return {
    id: result.id, name: result.name, text: result.text, avatar: result.avatar, color: result.color, createdAt: result.createdAt,
    _count: { negativeVotes: 0, positiveVotes: 0 }, voteStatus: 'NEUTRAL',
  };
})