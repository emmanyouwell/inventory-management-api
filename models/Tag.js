const db = require('../config/database');

const Tags = {
    async getAll() {
        // Fetch all tags
        return db('tags').select('*');
    },

    async getById(id){
        // Fetch a single tag by ID
        return db('tags').where({id}).first();
    },

    async create(tagData, trx = db){
        // Create new tag
        const [tag] = await trx('tags').insert(tagData).returning('*');
        return tag;
    },

    async update(id, tagData, trx=db){
        // Update tag details
        const [updatedTag] = await trx('tags').where({id}).update(tagData).returning('*');
        return updatedTag;
    },

    async delete(id){
        // Delete tag by ID
        return db('tags').where({id}).del();
    }
}

module.exports = Tags;