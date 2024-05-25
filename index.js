const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/model');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FarmDB');
}

main()
    .then(() => console.log("Mongoose Connected"))
    .catch(err => console.log("Mongoose Error : " + err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.redirect('/products')
})

app.get('/products', async (req, res) => {
    const allProducts = await Product.find();
    res.render('./products/products', { allProducts });
})

app.get('/products/new', async (req, res) => {
    res.render('./products/new');
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('./products/shows', { foundProduct });
})

app.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;
    const foundProducts = await Product.find({ category: category });
    res.render('./products/category', { foundProducts, category });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    console.log(foundProduct);
    res.render('./products/edit', { foundProduct });
})

app.post('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = Product.findById(id);
    const { name, price, category } = await req.body;
    foundProduct.updateOne({ _id: id }, { name: name, price: price, category: category })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    res.redirect(`/products/${id}`)
})

app.post('/products/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    res.redirect('/products');
})

app.post('/products/new', async (req, res) => {
    const { name, price, category } = await req.body;
    const newProduct = new Product({
        name: name,
        price: price,
        category: category
    });
    newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})


app.listen(3000, () => {
    console.log("Listen");
})