const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Configs = mongoose.model('Configs', new Schema({
    protection:Number,
    maxMargin:Number,
    incentive:Number,
    name:String,
    userPay:String,
    passwordPay:String,
    userPayTest:String,
    passwordPayTest:String,
    urlPayTC:String,
    franchise:[
        {
            name:String,
            code:Number,
            state:Boolean,
            bins:[String], 
            testTrue:{pan:String,cvv:String,month:String,year:String},
            testFalse:{pan:String,cvv:String,month:String,year:String}
        }
    ],
    stateTree:[
        {
            name:String,
            code:Number,
            codeParend:Number,
            nameGroup:String,
            codeGroup:Number,
            light:Number
        }
    ],
}));

module.exports = Configs;