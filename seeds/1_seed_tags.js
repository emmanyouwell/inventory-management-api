/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE tags RESTART IDENTITY CASCADE');
  await knex('tags').insert([
    {name: 'Electronics'},
    {name: 'Footwear'},
    {name: 'Sale'}
  ]);
};
