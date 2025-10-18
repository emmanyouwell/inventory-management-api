/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('product_tags', function (table) {
        table.integer('product_id').unsigned().notNullable();
        table.integer('tags_id').unsigned().notNullable();

        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.foreign('tags_id').references('id').inTable('tags').onDelete('CASCADE');

        table.primary(['product_id', 'tags_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_tags');
};
