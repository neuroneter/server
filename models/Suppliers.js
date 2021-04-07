const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Suppliers = mongoose.model('Suppliers', new Schema({
    url:String,
    name: String,
    divipola: String,
    zipCode: String,
    margStore:Number,
    margCatalogue:Number,
    discount:Number,
    description: String,
    seo: String
}));

module.exports = Suppliers;