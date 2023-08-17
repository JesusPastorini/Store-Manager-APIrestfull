const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const [res] = await connection.execute('SELECT * FROM products');
    return camelize(res);
  };

const findById = async (Id) => {
  const [[resId]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [Id],
  );
  return camelize(resId);
};

const create = async (product) => {
      const [result] = await connection.execute(
          'INSERT INTO products (name) VALUES (?)',
          [product],
      );
      const newProductId = result.insertId;
      const newProduct = await findById(newProductId);
      return newProduct;
};

module.exports = {
  findAll,  
  findById,
  create,
};