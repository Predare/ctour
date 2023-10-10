import textTranslitServer from '~/composables/textTranslit.server';
import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  var result = await addFilm(body.type, body.name, body.description, body.genres, 
    body.yearStart, body.yearEnd, body.ratingKinopoisk, body.ratingImdb, 
    body.selections, body.voiceStudios, body.countrys, body.actors, body.directors, '', body.ageRestriction);

  return result.link;
})

/**
 * Creates a new film entry in the database.
 *
 * @param {string} type - The type of the film.
 * @param {string} name - The name of the film.
 * @param {string} description - The description of the film.
 * @param {array} genres - An array of genre IDs that the film belongs to.
 * @param {number} yearStart - The starting year of the film.
 * @param {number} yearEnd - The ending year of the film.
 * @param {number} kpRating - The Kinopoisk rating of the film.
 * @param {number} imdbRating - The IMDb rating of the film.
 * @param {array} selections - An array of selection IDs that the film belongs to.
 * @param {array} voiceStudios - An array of voice studio IDs that voiced the film.
 * @param {array} countrys - An array of country IDs that the film belongs to.
 * @param {array} actors - An array of actor IDs that acted in the film.
 * @param {array} directors - An array of director IDs that directed the film.
 * @param {string} photoLink - The link to the photo of the film.
 * @return {Promise} A promise that resolves to the newly created film entry.
 */
async function addFilm(type, name, description, genres, yearStart, yearEnd, 
  kpRating, imdbRating, selections, voiceStudios, countrys, actors, directors, photoLink, ageRestriction) {
  return await db.film.create({
    data: {
      type: type,
      name: name,
      description: description,
      actors: {
        connect: actors,
      },
      directors: {
        connect: directors,
      },
      genres: {
        connect: genres,
      },
      kinopoiskRating: Number(kpRating),
      imdbRating: Number(imdbRating),
      ageRestriction: Number(ageRestriction),
      selections: {
        connect: selections,
      },
      voice: {
        connect: voiceStudios
      },
      country: {
        connect: countrys,
      },
      posterLink: photoLink,
      yearStart: Number(yearStart),
      yearEnd: Number(yearEnd),
      link: textTranslitServer(name + ' ' + yearStart),
      views: 0,
    }
  });
}