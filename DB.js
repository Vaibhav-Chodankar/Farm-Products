const mongoose = require('mongoose');
const Product = require('./model/model');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FarmDB');
}

main()
    .then(() => console.log("Mongoose Connected"))
    .catch(err => console.log("Mongoose Error : " + err));

Product.insertMany([
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
    {
        name: 'Fairy Eggplant',
        price: 1.60,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    }
])
    .then(res => console.log(res))
    .catch(err => console.log(err));