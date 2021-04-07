const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customers = mongoose.model('Customers', new Schema({
    firstName:String,
    lastName:String,
    typeDocument:Number,
    document:String,
    sex:Number,
    birhtday:String,
    email:String,
    pass:String,
    celPhone:String,
    alertWhatsapp:Boolean,
    view:[String],
    ip:String,
    stores:[String],
    cart:[{
        name:String,
        image:String,
        alot: Number,
        sku: String,
        newPrice: Number,
        priceOld: Number,
        discountP:Number,
        dicountMarg: Number,
        taxValue: Number,
        stock:Number,
        status:Boolean,
        bDimensions: {
            heigth: Number, 
            width: Number, 
            deep: Number, 
            weight: Number
        },
        dimensions: {
            heigth: Number, 
            width: Number, 
            deep: Number, 
            weight: Number
        }
    }],
    bookAddress:[{
        firstName:String,
        lastName:String,
        typeDocument:Number,
        document:String,
        celPhone:String,
        phone:String,
        state:String,
        city:String,
        neighborhood:String,
        zipCode:String,
        address:String,
        typeHouse:String,
        note:String,
        responsible:String,
        latitude:String,
        longitude:String,
        default:Boolean
    }]
}));

module.exports = Customers;