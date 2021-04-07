const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Groups = mongoose.model('Groups', new Schema({
    code:String,
    group:String,
    name:String,
    color:String,
    icon:String,
    rol:[Number]
}));

module.exports = Groups;