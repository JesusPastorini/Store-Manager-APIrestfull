const express = require('express');
const { productsControler, salesControler } = require('./controllers');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsControler.openProducts);
app.get('/products/:id', productsControler.openProductsId);
app.post('/products', productsControler.addProducts);

app.get('/sales', salesControler.openSales);
app.get('/sales/:id', salesControler.openSalesId);

module.exports = app;
