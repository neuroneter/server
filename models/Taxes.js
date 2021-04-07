const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Taxes = mongoose.model('Taxes', new Schema({
    url:String,
    name:String,
    value:Number
}));

module.exports = Taxes;