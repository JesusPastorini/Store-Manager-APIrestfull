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

const updateProduct = async (productId, name) => {
  const [result] = await connection.execute(
      'UPDATE products SET name = ? WHERE id = ?',
      [name, productId],
  );

  if (result.affectedRows === 0) {
    return null; // Produto não encontrado
}

  return { id: productId, name };
};

module.exports = {
  findAll,  
  findById,
  create,
  updateProduct,
};