import textTranslitServer from '~/composables/textTranslit.server';
import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
  const { serverMeilisearchClient } = event.context;
  const body = await readBody(event);
  console.log(body);

  // Add new genres to the database
  const existedGenres = await findExistedGenres(body.genres);
  const newGenres = body.genres.filter(genre => {
    return existedGenres.find(existedGenre => existedGenre.name === genre.name) == undefined;
  });
  if (newGenres.length > 0) await addNewGenres(newGenres, serverMeilisearchClient);

  // Add new stuff to the database
  const existedStuff = await findExistedStuff(body.actors.concat(body.directors));
  const newStuff = (body.actors.concat(body.directors)).filter(stuff => {
    return existedStuff.find(existedStuff => existedStuff.name === stuff.name) == undefined;
  });
  if (newStuff.length > 0) await addNewStuff(newStuff, serverMeilisearchClient);

  // Add new countrys to the database
  const existedCountrys = await findExistedCountrys(body.countrys);
  const newCountrys = body.countrys.filter(country => {
    return existedCountrys.find(existedCountry => existedCountry.name === country.name) == undefined;
  });
  if (newCountrys.length > 0) await addNewCountrys(newCountrys, serverMeilisearchClient);

  // Add new selections to the database
  const existedSelections = await findExistedSelection(body.selections);
  const newSelections = body.selections.filter(selection => {
    return existedSelections.find(existedSelection => existedSelection.name === selection.name) == undefined;
  });
  if (newSelections.length > 0) await addNewSelection(newSelections, serverMeilisearchClient);

  // Add new voice studios to the database
  const existedVoiceStudios = await findExistedVoiceStudios(body.voiceStudios);
  const newVoiceStudios = body.voiceStudios.filter(voiceStudio => {
    return existedVoiceStudios.find(existedVoiceStudio => existedVoiceStudio.name === voiceStudio.name) == undefined;
  });
  if (newVoiceStudios.length > 0) await addNewVoiceStudios(newVoiceStudios, serverMeilisearchClient);

  var result = await addFilm(body.type, body.name, body.description, body.genres, 
    Number(body.yearStart), Number(body.yearEnd), Number(body.ratingKinopoisk), Number(body.ratingImdb), 
    body.selections, body.voiceStudios, body.countrys, body.actors, body.directors, '', Number(body.ageRestriction));

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
      kinopoiskRating: kpRating,
      imdbRating: imdbRating,
      ageRestriction: ageRestriction,
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

/**
 * Finds and returns a list of existing genres based on the given array of genres.
 *
 * @param {Array} genres - An array of genre objects.
 * @return {Promise<Array>} - A promise that resolves to an array of existing genre objects.
 */
async function findExistedGenres(genres) {
  return await db.genre.findMany({
    where: {
      name: {
        in: genres.map(genre => {
          return genre.name;
        })
      }
    }
  });
}

/**
 * Adds new genres to the database.
 *
 * @param {Array} genres - An array of genre objects to be added.
 * @return {Promise} - A promise that resolves to the result of the database operation.
 */
async function addNewGenres(genres) {
  return await db.genre.createMany({
    data: genres.map(genre => {
      return {
        name: genre.name,
      }
    })
  });
}

/**
 * Finds existing stuff based on the given criteria.
 *
 * @param {Array} stuffers - An array of stuff objects.
 * @return {Promise<Array>} A promise that resolves to an array of existing stuff objects.
 */
async function findExistedStuff(stuffers) {
  return await db.stuff.findMany({
    where: {
      name: {
        in: stuffers.map(stuff => {
          return stuff.name;
        })
      }
    }
  })
}

/**
 * Adds new stuff to the database.
 *
 * @param {Array} stuffers - An array of objects representing the stuff to be added.
 * @returns {Promise} - A promise that resolves to the result of the database operation.
 */
async function addNewStuff(stuffers) {
  return await db.stuff.createMany({
    data: stuffers.map(stuff => {
      return {
        name: stuff.name,
      }
    })
  });
}

/**
 * Finds existing selections based on the given array of selections.
 *
 * @param {Array} selections - An array of selections.
 * @return {Promise<Array>} - A promise that resolves to an array of existing selections.
 */
async function findExistedSelection(selections) {
  return await db.selection.findMany({
    where: {
      name: {
        in: selections.map(selection => {
          return selection.name;
        })
      }
    }
  })
}

/**
 * Creates new selections in the database.
 *
 * @param {Array} selections - An array of selection objects.
 * @return {Promise} A promise that resolves to the result of the createMany operation.
 */
async function addNewSelection(selections) {
  return await db.selection.createMany({
    data: selections.map(selection => {
      return {
        name: selection.name,
      }
    })
  });
}

/**
 * Finds the existing countries in the database based on the provided list of country names.
 *
 * @param {Array<{name: string}>} countries - An array of country objects containing the name of each country.
 * @return {Promise<Array<{id: number, name: string}>>} - A promise that resolves to an array of country objects matching the provided names.
 */
async function findExistedCountrys(countries) {
  return await db.country.findMany({
    where: {
      name: {
        in: countries.map(country => {
          return country.name;
        })
      }
    }
  })
}

/**
 * Adds new countries to the database.
 *
 * @param {Array} countries - An array of country objects.
 * @return {Promise} A promise that resolves to the result of creating the countries in the database.
 */
async function addNewCountrys(countries) {
  return await db.country.createMany({
    data: countries.map(country => {
      return {
        name: country.name,
      }
    })
  });
}

/**
 * Finds existing voice studios based on the provided array of voice studios.
 *
 * @param {Array} voiceStudios - An array of voice studios to search for.
 * @return {Promise<Array>} - A promise that resolves to an array of existing voice studios.
 */
async function findExistedVoiceStudios(voiceStudios) {
  return await db.voiceStudio.findMany({
    where: {
      name: {
        in: voiceStudios.map(voiceStudio => {
          return voiceStudio.name;
        })
      }
    }
  })
}

/**
 * Creates new voice studios in the database.
 *
 * @param {array} voiceStudios - An array of voice studios to be added.
 * @return {Promise} A promise that resolves to the result of creating the voice studios.
 */
async function addNewVoiceStudios(voiceStudios) {
  return await db.voiceStudio.createMany({
    data: voiceStudios.map(voiceStudio => {
      return {
        name: voiceStudio.name
      }
    })
  })
}