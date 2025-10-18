const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

const Inventory = {
    async create(transactionData) {
        // Create inventory transaction and update product stock atomically
        return await db.transaction(async (trx) => {
            const { product_id, quantity, type } = transactionData;

            // Check if product exists
            const product = await trx('products').where({ id: product_id }).first();
            if (!product) {
                throw new AppError('Product does not exist', 404);
            }

            // Compute new stock quantity
            let newStock = product.current_stock;
            if (type === 'in') {
                newStock += quantity;
            } else if (type === 'out') {
                if (product.current_stock <= 0 || product.current_stock < quantity) {
                    throw new AppError('Insufficient stock for the transaction', 400);
                }
                newStock -= quantity;
            }
            else {
                throw new AppError('Invalid transaction type', 400);
            }

            // Update product stock
            await trx('products').where({ id: product_id }).update({ current_stock: newStock })


            // Record inventory transaction
            const [inventoryTransaction] = await trx('inventory_transactions').insert(transactionData).returning('*');

            return inventoryTransaction;

        });
    }
}

module.exports = Inventory;