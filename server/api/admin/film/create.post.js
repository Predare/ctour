import textTranslitServer from '~/composables/textTranslit.server';
import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  const { serverMeilisearchClient } = event.context
  const body = await readBody(event);
  var result = null;

  var genreObjects = [];

  body.genres.forEach(element => {
    genreObjects.push({
      name: element.title,
    })
  });

  async function addFilm() {
    result = await db.film.create({
      data: {
        type: body.type,
        name: body.name,
        description: body.description,
        genres: {
          connect: genreObjects,
        },
        yearStart: Number(body.yearStart),
        yearEnd: Number(body.yearEnd),
        link: textTranslitServer(body.name + ' ' + body.yearStart),
        views: 0,
      }
    })
  }

  async function findExistedGenres() {
    return await db.genre.findMany({
      where: {
        name: {
          in: body.genres.map(genre => {
            return genre.title;
          })
        }
      }
    });
  }

  const existedGenres = await findExistedGenres();
  const newGenres = body.genres.filter(genre => {
    return existedGenres.find(existedGenre => existedGenre.name === genre.title) == undefined;
  })

  async function addNewGenres() {
    await db.genre.createMany({
      data: newGenres.map(genre => {
        return {
          name: genre.title
        }
      })
    });
    var result = await serverMeilisearchClient.index('genres').addDocuments(newGenres.map(genre => {
      return {
        id: 11,
        name: genre.title
      }
    }));
  }
  if(newGenres.length > 0)await addNewGenres();
  await addFilm();
  return {

  };
})