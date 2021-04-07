const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brands = mongoose.model('Brands', new Schema({
    url:String,
    name:String,
    image:String,
    icon:String,
    description:String,
    banner:String,
    seo:String
}));

module.exports = Brands;