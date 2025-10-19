const db = require('../config/database');
const AppError = require('../utils/ErrorHandler');

const Inventory = {
    async getAll() {
        // Fetch all inventory transactions
        return await db('inventory_transactions').select('*');
    },
    async getById(id) {
        // Fetch a single inventory transaction by ID
        return await db('inventory_transactions').where({ id }).first();
    },
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
    },

    /** Optional methods for updating and deleting inventory transactions
    
    async update(id, transactionData) {
        const {quantity, type} = transactionData;
        // Update inventory transaction details (quantity and type) and adjust product stock accordingly
        return await db.transaction(async (trx) => {
            const [updatedTransaction] = await trx('inventory_transactions').where({ id }).update({quantity, type}).returning('*');
            // Compute stocks based on transactions
            const stocks = await trx('inventory_transactions').select('product_id').sum({
                total_in: trx.raw(`CASE WHEN type = 'in' THEN quantity ELSE 0 END`),
                total_out: trx.raw(`CASE WHEN type = 'out' THEN quantity ELSE 0 END`)
            }).groupBy('product_id');

            // Update products with computed stocks
            for (const s of stocks) {
                const current_stock = s.total_in - s.total_out;
                await trx('products').where({ id: s.product_id }).update({ current_stock });
            }

            return updatedTransaction;
        })
    },

    async delete(id) {
        // Delete inventory transaction by ID
        const transaction = await this.getById(id);
        if (!transaction){
            throw new AppError('Inventory transaction not found', 404);
        }
        return db('inventory_transactions').where({ id }).del();
    }
        
    */
}

module.exports = Inventory;