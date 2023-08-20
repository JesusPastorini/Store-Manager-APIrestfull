const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const qry = `
        SELECT 
            sp.sale_id AS saleId, 
            s.date AS date,
            sp.product_id AS productId,
            sp.quantity AS quantity
        FROM 
            sales_products AS sp 
        JOIN 
            sales AS s ON sp.sale_id = s.id
        ORDER BY 
            sp.sale_id, s.date`;
    const [res] = await connection.execute(qry);
    return camelize(res);
  };

const findById = async (Id) => {
  const qry = `
        SELECT 
            s.date AS date,
            sp.product_id AS productId,
            sp.quantity AS quantity
        FROM 
            sales_products AS sp 
        JOIN 
            sales AS s ON sp.sale_id = s.id 
        WHERE 
            sp.sale_id = ? 
        ORDER BY 
            s.date`;
  const [resId] = await connection.execute(qry, [Id]);
  return camelize(resId);
};

const createSale = async () => {
    const [result] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
    return { id: result.insertId };
};

const createSaleProduct = async (saleId, productId, quantity) => {
    await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [saleId, productId, quantity],
    );

    return { productId, quantity };
};

module.exports = {
  findAll,  
  findById,
  createSale,
  createSaleProduct,
};