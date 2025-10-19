const Inventory = require('../models/Inventory');

// POST /products/:id/stock
exports.createInventoryTransaction = async (req, res, next) => {
    try {
        const {id} = req.params;
        const transactionData = {
            ...req.body,
            product_id: id
        }
        const result = await Inventory.create(transactionData);
        res.status(201).json({
            success: true,
            message: 'Inventory transaction created successfully',
            data: result
        })
    } catch (error) {
        next(error);
    }
}