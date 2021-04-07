const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stores = mongoose.model('Store', new Schema({
    name:String,
    invitation:String,
    fee:Number,
    discount:Number,
    bins:String,
    pse:String,
    description:String,
    catalogue:Boolean,
    penalty:Boolean,
    viewPrice:Boolean,
    typeStore:String,
    idUser:String,
    url:String
}));

module.exports = Stores;