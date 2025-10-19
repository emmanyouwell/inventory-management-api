const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

const Tags = {
    async getAll() {
        // Fetch all tags
        return db('tags').select('*');
    },

    async getById(id) {
        // Fetch a single tag by ID
        return db('tags').where({ id }).first();
    },

    async create(tagData) {
        // Create new tag
        return await db.transaction(async (trx) => {
            const [tag] = await trx('tags').insert(tagData).returning('*');
            return tag;
        })
    },

    async update(id, tagData) {
        // Update tag details
        return await db.transaction(async (trx) => {
            const [updatedTag] = await trx('tags').where({ id }).update(tagData).returning('*');
            return updatedTag;
        });
    },

    async delete(id) {
        // Delete tag by ID
        const tag = await this.getById(id);
        if (!tag){
            throw new AppError('Tag not found', 404);
        }
        return db('tags').where({ id }).del();
    }
}

module.exports = Tags;