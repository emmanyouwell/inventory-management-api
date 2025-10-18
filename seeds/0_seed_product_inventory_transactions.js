/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE products RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE inventory_transactions RESTART IDENTITY CASCADE')

  // Insert products seed data
  await knex('products').insert([
    {
      name: "Wireless Bluetooth Headphones",
      description: "High-quality over-ear Bluetooth headphones with noise cancellation and 20-hour battery life.",
    },
    {
      name: "Smart LED TV 43-inch",
      description: "Full HD Smart TV with built-in streaming apps and HDMI connectivity.",
    },
    {
      name: "Men's Running Shoes",
      description: "Lightweight, breathable running shoes designed for comfort and durability.",
    },
    {
      name: "Women's Casual Sneakers",
      description: "Stylish white sneakers suitable for everyday wear and walking.",
    },
    {
      name: "Gaming Mouse",
      description: "Ergonomic RGB gaming mouse with 7 programmable buttons and adjustable DPI.",
    },
    {
      name: "Wireless Charger Pad",
      description: "Fast wireless charging pad compatible with Qi-enabled devices.",
    },
    {
      name: "Leather Dress Shoes",
      description: "Premium brown leather shoes perfect for formal and office wear.",
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable waterproof Bluetooth speaker with rich bass and 10-hour playtime.",
    },
    {
      name: "Smartwatch Series 5",
      description: "Feature-rich smartwatch with heart rate monitor, GPS, and fitness tracking.",
    },
    {
      name: "Women's Heeled Sandals",
      description: "Elegant heeled sandals for parties and special occasions, now on sale.",
    }
  ]);

  // Insert inventory transactions seed data
  await knex('inventory_transactions').insert([
    // Product 1 - Wireless Bluetooth Headphones
    { product_id: 1, type: 'in', quantity: 20 },
    { product_id: 1, type: 'out', quantity: 5 },

    // Product 2 - Smart LED TV 43-inch
    { product_id: 2, type: 'in', quantity: 10 },
    { product_id: 2, type: 'out', quantity: 3 },

    // Product 3 - Men’s Running Shoes
    { product_id: 3, type: 'in', quantity: 40 },
    { product_id: 3, type: 'out', quantity: 15 },

    // Product 4 - Women’s Casual Sneakers
    { product_id: 4, type: 'in', quantity: 25 },
    { product_id: 4, type: 'out', quantity: 8 },

    // Product 5 - Gaming Mouse
    { product_id: 5, type: 'in', quantity: 50 },
    { product_id: 5, type: 'out', quantity: 10 },

    // Product 6 - Wireless Charger Pad
    { product_id: 6, type: 'in', quantity: 60 },
    { product_id: 6, type: 'out', quantity: 20 },

    // Product 7 - Leather Dress Shoes
    { product_id: 7, type: 'in', quantity: 15 },
    { product_id: 7, type: 'out', quantity: 5 },

    // Product 8 - Bluetooth Speaker
    { product_id: 8, type: 'in', quantity: 30 },
    { product_id: 8, type: 'out', quantity: 12 },

    // Product 9 - Smartwatch Series 5
    { product_id: 9, type: 'in', quantity: 25 },
    { product_id: 9, type: 'out', quantity: 10 },

    // Product 10 - Women’s Heeled Sandals
    { product_id: 10, type: 'in', quantity: 20 },
    { product_id: 10, type: 'out', quantity: 6 }
  ]);

  // Compute stocks based on transactions
  const stocks = await knex('inventory_transactions').select('product_id').sum({
    total_in: knex.raw(`CASE WHEN type = 'in' THEN quantity ELSE 0 END`),
    total_out: knex.raw(`CASE WHEN type = 'out' THEN quantity ELSE 0 END`)
  }).groupBy('product_id');

  // Update products with computed stocks
  for (const s of stocks){
    const current_stock = s.total_in - s.total_out;
    await knex('products').where({id: s.product_id}).update({current_stock});
  }
};
