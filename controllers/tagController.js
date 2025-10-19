const Tag = require('../models/Tag');
const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');
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
        if (!tags || tags.length === 0) {
            throw new AppError('No tags found', 404);
        }
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

// GET /tags/:id
exports.getTagById = async (req, res, next) => {
    try {
        const tag = await Tag.getById(req.params.id);
        if (!tag) {
            throw new AppError('Tag not found', 404);
        }
        res.status(200).json({
            success:true,
            message: 'Tag fetched successfully',
            data: tag
        });
    }catch (error){
        next(error);
    }
}

// PATCH /tags/:id
exports.updateTag = async (req, res, next) => {
    try {
        const result = await Tag.update(req.params.id, req.body);
        if (!result) {
            throw new AppError('Tag not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Tag updated successfully',
            data: result
        });
    }catch (error){
        next(error);
    }
}

// DELETE /tags/:id
exports.deleteTag = async (req, res, next) => {
    try {
        await Tag.delete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Tag deleted successfully',
            data: null
        });
    }catch(error){
        next(error);
    }
}