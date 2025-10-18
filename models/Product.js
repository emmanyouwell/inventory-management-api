const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

const Product = {

    async getAll(query) {
        // Fetch all products
        return db('products as p')
            .leftJoin('product_tags as pt', 'p.id', '=', 'pt.product_id')
            .leftJoin('tags as t', 'pt.tags_id', '=', 't.id')
            .select(
                'p.id',
                'p.name',
                'p.description',
                'p.current_stock',
                db.raw(`
                    COALESCE(
                        json_agg(
                            DISTINCT jsonb_build_object(
                            'id', t.id,
                            'name', t.name
                            )
                        ) FILTER (WHERE t.id IS NOT NULL),
                        '[]'
                    ) as tags
                `)
            )
            .groupBy('p.id')
            .modify((qb)=>{
                if (query.name){
                    qb.where('p.name', 'ilike', `%${query.name}%`)
                }
                if (query.tag) {
                    qb.where('t.name', 'ilike', `%${query.tag}%`)
                }
                if (query.min_stock){
                    qb.where('p.current_stock', '>=', query.min_stock)
                }
            });
    },

    async getById(id) {
        // Fetch a single product by ID
        return db('products').where({ id }).first();
    },

    async create(productData, trx = db) {
        // Create new product with associated tags
        const { name, description, tags = [] } = productData;

        // Record name and description and return the ID
        const [product] = await trx('products').insert({ name, description }).returning('*');

        if (!product) {
            throw new AppError('Product creation failed', 500);
        }
        // Check if tags exist and associate them with the product
        if (tags.length > 0) {
            const existingTags = await trx('tags').whereIn('id', tags);

            if (existingTags.length !== tags.length) {
                throw new AppError('One or more tags do not exist', 400);
            }

            const productTags = tags.map(tagId => ({
                product_id: product.id,
                tags_id: tagId
            }));

            // Insert to product_tags junction table
            await trx('product_tags').insert(productTags);
        }
        return { ...product, tags };
    },

    async update(id, productData, trx = db) {
        // Update name and description of the product
        const { name, description } = productData;
        const [updatedProduct] = await trx('products').where({ id }).update({ name, description }).returning('*');
        return updatedProduct;
    },

    async delete(id) {
        // Delete product by ID
        return db('products').where({ id }).del();
    }
}

module.exports = Product;