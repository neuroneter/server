const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = mongoose.model('categories', new Schema({
    url:String,
    name:String,
    description:String,
    icon:String,
    banner:String,
    seo:String,
    lot:Number
}));

module.exports = Categories;