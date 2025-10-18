const Product = require('../models/Product');
const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

// POST /products
exports.createProduct = async (req, res, next) => {
    try {
        const result = await db.transaction(async (trx) => {
            return await Product.create(req.body, trx);
        })
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// GET /products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.getAll(req.query);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        next(error);
    }
}

// GET /products/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
}

// PATCH /products/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await db.transaction(async (trx) => {
            return await Product.update(id, req.body, trx);
        })
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        })
    } catch (error) {
        next(error);
    }
}

// DELETE /products/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCount = await Product.delete(id);
        if (deletedCount === 0) {
            throw new AppError('Product not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });

    } catch (error) {
        next(error);
    }
}