const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Divipola = mongoose.model('Divipola', new Schema({
    nameCity: String,
    codeDane: String,
    zipCode: String,
    curriers: [{ nameCuerrie:String, codeCiti:String }],
    cost: Number,
    pvp: Number,
    tax_id: Number,
    nameBrand: String,
    warehouse: String,
    supplier: String
}));

module.exports = Divipola;