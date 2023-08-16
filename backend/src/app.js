const express = require('express');
const { productsControler } = require('./controllers');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsControler.openProducts);
app.get('/products/:id', productsControler.openProductsId);

module.exports = app;
