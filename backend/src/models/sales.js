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

module.exports = {
  findAll,  
  findById,
};