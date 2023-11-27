const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGOBD_URL } = require('./config')

global.__basedir = __dirname;
mongoose.connect(MONGOBD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/customer_model');
require('./models/cart_model');
require('./models/order_model');
require('./models/category_model');
require('./models/product_model');


app.use(cors());
app.use(express.json());

app.use(require('./routes/customer_route'));
app.use(require('./routes/file_route'));
app.use(require('./routes/category_route'));
app.use(require('./routes/product_route'));
app.use(require('./routes/cart_route'));
app.use(require('./routes/order_route'));


const products = require('./products')
app.get("/products", (req, res) => {
    res.send(products);
});

app.listen(PORT, () => {
    console.log("Server started");
});