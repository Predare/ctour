import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    const selectors = {
        id: true,
        name: true,
    }
  async function genres() {
    return await db.genre.findMany(
      {
          select: selectors,
      }
    );
  }

  async function countries() {
    return await db.country.findMany(
        {
            select: selectors,
        }
    );
  }

  async function selections () {
    return await db.selection.findMany(
        {
            select: selectors,
        }
    );
  }

  async function voiceStudios () {
    return await db.voiceStudio.findMany(
        {
            select: selectors,
        }
    );
  }

  return {
    genres: await genres(),
    countries: await countries(),
    selections: await selections(),
    voiceStudios: await voiceStudios()
  };
})