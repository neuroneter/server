const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catalogue = mongoose.model('Catalogue', new Schema({
    sku_id: String,
    nameSku: String,
    refCode: String,
    lotSku: Number,
    cost: Number,
    pvp: Number,
    tax_id: Number,
    nameBrand: String,
    warehouse: String,
    supplier: String
}));

module.exports = Catalogue;