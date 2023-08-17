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

module.exports = {
  findAll,  
  findById,
};