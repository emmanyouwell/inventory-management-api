const Product = require('../models/Product');
const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

// POST /products
exports.createProduct = async (req, res, next) => {
    try {
        const result = await Product.create(req.body);
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
        if (!products || products.length === 0){
            throw new AppError('No products found', 404);
        }
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
        const updatedProduct = await Product.update(id, req.body);
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

        await Product.delete(id);
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });

    } catch (error) {
        next(error);
    }
}