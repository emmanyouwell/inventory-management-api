/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('inventory_transactions', function (table) {
        table.increments('id').primary();
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
        table.integer('quantity').notNullable();
        table.enu('type', ['in', 'out']).notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('inventory_transactions');
};
