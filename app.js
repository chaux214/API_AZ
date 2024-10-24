const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const customersRoutes = require('./routes/customersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const orderdetailRoutes = require('./routes/orderdetailRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentmethodRoutes = require('./routes/paymentmethodRoutes');
const providersRoutes = require('./routes/providersRoutes');
const shippingaddressesRoutes = require('./routes/shippingaddressesRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Ruta de prueba
app.get('/ca', (req, res) => {
    res.send('Hello world and first API');
});

app.use('/customers', customersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/categories', categoriesRoutes);
app.use('/orderdetail', orderdetailRoutes);
app.use('/orders', ordersRoutes);
app.use('/paymentmethod', paymentmethodRoutes);
app.use('/providers', providersRoutes);
app.use('/shippingaddresses', shippingaddressesRoutes);

const PORT = 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
