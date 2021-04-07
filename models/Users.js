const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = mongoose.model('User', new Schema({
    name: String,
    unit: String,
    email: String,
    phone: String,
    idSupplier: String,
    idStore: String
}));

module.exports = Users