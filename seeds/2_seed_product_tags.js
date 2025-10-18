/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE product_tags RESTART IDENTITY CASCADE');
  await knex('product_tags').insert([
    // Electronics (tags_id = 1)
    { product_id: 1, tags_id: 1 },
    { product_id: 2, tags_id: 1 },
    { product_id: 5, tags_id: 1 },
    { product_id: 6, tags_id: 1 },

    // Footwear (tags_id = 2)
    { product_id: 1, tags_id: 2 },
    { product_id: 3, tags_id: 2 },
    { product_id: 4, tags_id: 2 },
    { product_id: 7, tags_id: 2 },

    // Sale (tags_id = 3)
    { product_id: 1, tags_id: 3 },
    { product_id: 8, tags_id: 3 },
    { product_id: 9, tags_id: 3 },
    { product_id: 10, tags_id: 3 }
  ]);
};
