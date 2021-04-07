const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = mongoose.model('Products', new Schema({
    sku:String,
    cDate:Date,
    status:Boolean,
    idBrand:String,
    nBrand:String,
    idSupplier:String,
    reference:String,
    code:String,
    name:String,
    description:String,
    sDescription:String,
    specifications:String,
    dimensions: { heigth:Number, width:Number, deep:Number, weight:Number },
    bDimensions: { heigth:Number, width:Number, deep:Number, weight:Number },
    warranty: Number,
    dWarranty: String,
    idTax:String,
    pvp:Number,
    cost:Number,
    pvpC:Number,
    dollar:Number,
    margCatalogue:Number,
    discount:[{
        stores:[String],
        value:Number,
        startDate:Date,
        endDate:Date,
        bonus:Boolean,
    }],
    freeShipping:Boolean,
    stock:Number,
    order:Number,
    categories:[String],
    tags:[Number],
    logchange:[{
        employee:String,
        date:Date,
        files:[{
            name:String,
            oldValue:String
        }]
    }],
    images:[{
        url:String,
        title:String,
        alt:String
    }],
    video:[{
        url:String,
        title:String,
        description:String
    }],
    document:[{
        url:String,
        title:String,
        alt:String,
        description:String
    }],
    keyWords:[{name:String}]
}));

module.exports = Products;