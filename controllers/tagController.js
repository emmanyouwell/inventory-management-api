const Tag = require('../models/Tag');
const db = require('../config/database');

// POST /tags
exports.createTag = async (req, res, next) => {
    try {
        const result = await db.transaction(async (trx) => {
            return await Tag.create(req.body, trx);
        })

        res.status(201).json({
            success: true,
            message: 'Tag created successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}


// GET /tags
exports.getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.getAll();
        res.status(200).json({
            success: true,
            message: 'Tags fetched successfully',
            data: tags
        });
    }
    catch(error){
        next(error);
    }
}

