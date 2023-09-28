import textTranslitServer from '~/composables/textTranslit.server';
import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  const { serverMeilisearchClient } = event.context;
  const body = await readBody(event);
  var result = null;

  var genreObjects = [];

  body.genres.forEach(element => {
    genreObjects.push({
      name: element.title,
    })
  });

  const existedGenres = await findExistedGenres(body.genres);
  const newGenres = body.genres.filter(genre => {
    return existedGenres.find(existedGenre => existedGenre.name === genre.title) == undefined;
  });

  if (newGenres.length > 0) await addNewGenres(newGenres, serverMeilisearchClient);
  await addFilm(body.type, body.name, body.description, body.genres, body.yearStart, body.yearEnd);

  return {};
})

async function addFilm(type, name, description, genres, yearStart, yearEnd) {
  result = await db.film.create({
    data: {
      type: type,
      name: name,
      description: description,
      genres: {
        connect: genres,
      },
      yearStart: Number(yearStart),
      yearEnd: Number(yearEnd),
      link: textTranslitServer(name + ' ' + yearStart),
      views: 0,
    }
  })
}

async function findExistedGenres(genres) {
  return await db.genre.findMany({
    where: {
      name: {
        in: genres.map(genre => {
          return genre.title;
        })
      }
    }
  });
}

async function addNewGenres(genres, serverMeilisearchClient) {
  await db.genre.createMany({
    data: genres.map(genre => {
      return {
        name: genre.title
      }
    })
  });
  var result = await serverMeilisearchClient.index('genres').addDocuments(genres.map(genre => {
    return {
      id: 11,
      name: genre.title
    }
  }));
}