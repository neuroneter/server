const express = require('express')
const router = express.Router();
const Stores = require('../models/Stores.js');
const Customers = require('../models/Customers.js');
const Categories = require('../models/Categories');
const Brands = require("../models/Brands");
const Suppliers = require("../models/Suppliers");
const Taxes = require("../models/Taxes");
const Configs = require("../models/Configs");
const EmailHtml = require("../models/Email.js");
const { route } = require('./Products.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    Stores.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:group', (req, res) => {
    Stores.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})

router.post('/', function(req, res){
    req.body.invitation = req.body.invitation.toUpperCase();
    Stores.create(req.body)
    .then(x => res.status(201).send(x)); 
})

router.post('/configs/find', function(req, res){
    Configs.find().sort({name:1}).then(function(response){
        res.status(200).send(response);
    });
})

router.put('/configs/update', function(req, res){
    Configs.update({_id:req.body._id}, req.body)
    .then(x => {
        x["update"] = {_id:req.body._id};
        res.status(201).send(x)
    })
    .catch(x => res.status(401).send(x));
})

router.post('/back/find', function(req, res){
    Stores.find().sort({name:1}).then(function(response){
        res.status(200).send(response);
    });
})

router.put('/update', function(req, res){
    req.body.invitation = req.body.invitation.toUpperCase();
    Stores.update({_id:req.body._id}, req.body)
    .then(x => {
        x["update"] = {_id:req.body._id};
        res.status(201).send(x)
    })
    .catch(x => res.status(401).send(x));
})

router.put('/add', (req, res) => {
    req.body.invitation = req.body.invitation.toUpperCase();
    Stores.create(req.body)
    .then(x => res.status(201).send(x))
    .catch(x => res.status(401).send(x));
})

router.post('/find', function(req, res){
    var result = {}
    Customers.find({"email":req.body.e}).then(function(user){
        var storeSeleted = user[0].stores[0];
        result["user"] = {"view":user[0].view, "stores":user[0].stores, "email":user[0].email, "document":user[0].document, "bookAddress":user[0].bookAddress};
        Categories.find({},{_id:1,name:1,icon:1}).sort({order:1}).then(function(categories){
            result["categories"] = categories;
            Brands.find({},{_id:1,name:1}).sort({name:1}).then(function(brands){
                result["brands"] = brands;
                 Suppliers.find({},{_id:1,name:1}).sort({name:1}).then(function(suppliers){
                    result["suppliers"] = suppliers;
                    Taxes.find({},{_id:1,name:1,value:1}).sort({value:1}).then(function(taxes){
                        result["taxes"] = taxes;
                        Stores.find({"_id":storeSeleted}).sort({name:1}).then(function(stores){
                            var info = [];
                            Configs.find().then(function(config){
                                stores.forEach(val => {
                                    info.push({
                                        _id:val._id,
                                        name:val.name,
                                        invitation:val.invitation.toUpperCase(),
                                        bank:val.bank,
                                        bins:val.bins,
                                        catalogue:val.catalogue,
                                        discount:val.discount,
                                        typeStore:val.typeStore,
                                        viewPrice:val.viewPrice,
                                        idUser:val.idUser,
                                        penalty:val.penalty,
                                        calc:{v1:config[0].protection,v2:config[0].maxMargin,v3:config[0].incentive,v4:val.fee,v5:val.discount},
                                    })
                                });
                                result["stores"] = info;
                                res.status(200).send(result);
                            });
                        });
                    }); 
                });
            });
        });
    });
})

router.post('/invitation', function(req, res){
    var invi = req.body.i.replace(/ /gi,"");
    invi = invi.toUpperCase();
    Stores.find({"invitation":invi})
    .then(invitation => {
            if(invitation.length > 0){
                Customers.find({"email":req.body.e}).then(find => {
                    if(find.length == 0){
                        var email = req.body.e.toLowerCase();
                        Customers.create({"email":email, "pass":req.body.p, "stores":[invitation[0]._id]}).then(customer => {
                            var info ={customer:customer,store:invitation[0]};
                            res.status(201).send(info) 
                        });
                    }
                    else{
                        // Definimos el email
                        var mailOptions = {
                            from: 'gestion@bobseller.com',
                            to: req.body.e, 
                            subject: 'Recuperacon de contraseña',
                            text: 'Su contraseña es: '+find[0].pass
                        };

                        // Enviamos el email
                        Email.sendMail(mailOptions, function(error, info){
                            if (error){console.log(error);} 
                            else {console.log("Email sent");}
                        });
                        res.status(201).send({customer:null,errorCode:"Bob130",errorInfo:"El usuario "+req.body.e+" ya existe"});
                    }
                });
            }else{
                if(invi == "" || invi == " ")
                    var errorInfo = "El campo Invitación tiene que ser diligenciado.";
                else
                    var errorInfo = "Lo siento el código <<"+invi+">> no se encuentra activo, solicte un nuevo código.";
                
                res.status(201).send({customer:null, errorCode:"Bob131", errorInfo:errorInfo});
            }
        }   
    );
})

/*
router.post('/find', (req, res) => {
    Stores.find()
    .exec()
    .then(x => res.status(200).send(x));
})*/

module.exports = router