import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {

  var result;

  async function findAll() {
    return await db.country.findMany({});
  }

  await findAll().then(async response => {
    result = response;
  });

  return result;
})