const express = require('express')
const router = express.Router();
const Products = require('../models/Products.js');
const Categories = require('../models/Categories');
const Brands = require("../models/Brands");
const Suppliers = require("../models/Suppliers");
const Taxes = require("../models/Taxes");
const Stores = require("../models/Stores");
const { route } = require('./Stores.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    res.send("hola Juan");
    //Orders.find()
    //.exec()
    //.then(x => res.status(200).send(x));
})

//Solo utilizado por el seller para recuperar todos los filtros necesarios 
router.post('/findFilter', (req, res) => {
    var Vsorts = {};
    var Vfilters = {};
    var result = {}
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    //Recorremos todos los filtros que se piden
    //if(req.body.rol != undefined && req.body.rol != "" && req.body.rol != 1 && req.body.rol != 2)
    //    if(req.body.idSupplier != undefined && req.body.idSupplier != "") Vfilters["idSupplier"] = req.body.idSupplier;
    //if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i'); 

    var auxFilters = {}
    var valueFind = "";
    if(req.body.rol > 2 && req.body.idSupplier != ""){
        if(req.body.filFile != ""){
            if(req.body.filFile != "findFilterAll"){
                auxFilters[req.body.filFile] = req.body.filValue;
                Vfilters = {$and:[{idSupplier:req.body.idSupplier},auxFilters]}  
            }else{
                var valueFind = new RegExp('^'+req.body.filValue,'i'); 
                auxFilters["$or"] = [{"name":valueFind},{"reference":valueFind},{"code":valueFind},{"sku":valueFind}];
                Vfilters = {$and:[{idSupplier:req.body.idSupplier},auxFilters]} 
            }
        }
    }else{
        if(req.body.filFile != ""){
            if(req.body.filFile != "findFilterAll"){
                Vfilters[req.body.filFile] = req.body.filValue; 
            }else{
                var valueFind = new RegExp('^'+req.body.filValue,'i'); 
                Vfilters["$or"] = [{"name":valueFind},{"reference":valueFind},{"code":valueFind},{"sku":valueFind}];
            }
        }
    }
        

    var rPerFind = 0;
    var NPages = 220;

    //Consultamos cuantos registros hacen parte de la busqueda solicitada 
    Products.find(Vfilters).sort(Vsorts).countDocuments()
    .then(
        count => {
            rPerFind = count;
            NPages = Math.ceil(count/parseInt(req.body.limit));
        }
    );
    
    //Calculamos los registros que deveran ser excluidos en la paginacion de la consulta 
    const pageNumber = parseInt(req.body.pag);
    const nPerPage = parseInt(req.body.limit);
    const skypPage = pageNumber>0?((pageNumber-1)*nPerPage):0;

    if(req.body.limit == "10000000")
        Products.find(Vfilters).sort(Vsorts).skip(skypPage)
        .then(function(response){
            result["info"] = {
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            }
            result["data"] = response;
            res.status(200).send(result);
        });   
    else
        Products.find(Vfilters).sort(Vsorts).skip(skypPage).limit(parseInt(req.body.limit))
        .then(function(response){
            result["info"] = {
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            }
            result["data"] = response;
            res.status(200).send(result);
        });
});

//utilizado por la pagina de la tienda 
router.post('/back/find', (req, res) => {
    //5console.log("entre");
    var Vsorts = {};
    var Vfilters = {};
    var result = {}
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    //Recorremos todos los filtros que se piden
    if(req.body.rol != undefined && req.body.rol != "" && req.body.rol != 1 && req.body.rol != 2)
        if(req.body.idSupplier != undefined && req.body.idSupplier != "") Vfilters["idSupplier"] = req.body.idSupplier;
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i'); 

    //console.log(Vfilters);

    var rPerFind = 0;
    var NPages = 220;

    //Consultamos cuantos registros hacen parte de la busqueda solicitada 
    Products.find(Vfilters).sort(Vsorts).countDocuments()
    .then(
        count => {
            rPerFind = count;
            NPages = Math.ceil(count/parseInt(req.body.limit));
        }
    );
    
    //Calculamos los registros que deveran ser excluidos en la paginacion de la consulta 
    const pageNumber = parseInt(req.body.pag);
    const nPerPage = parseInt(req.body.limit);
    const skypPage = pageNumber>0?((pageNumber-1)*nPerPage):0;

    if(req.body.limit == "10000000")
        Products.find(Vfilters).sort(Vsorts).skip(skypPage)
        .then(function(response){
            result["info"] = {
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            }
            result["data"] = response;
            res.status(200).send(result);
        });   
    else
        Products.find(Vfilters).sort(Vsorts).skip(skypPage).limit(parseInt(req.body.limit))
        .then(function(response){
            result["info"] = {
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            }
            result["data"] = response;
            //res.status(200).send(result);
            
            Categories.find().then(function(response){
                result["categories"] = response;
                Brands.find().sort({name:1}).then(function(response){
                    result["brands"] = response;
                    Suppliers.find().sort({name:1}).then(function(response){
                        result["suppliers"] = response;
                        Taxes.find().sort({value:1}).then(function(response){
                            result["taxes"] = response;
                            Stores.find().sort({name:1}).then(function(response){
                                result["stores"] = response;
                                res.status(200).send(result);
                            });
                        });
                    });
                });
            });
        
        });
});

router.post('/catetorie', (req, res) => {

});

router.post('/brands', (req, res) => {
    res.send("hola Juan");
    //Orders.find()
});

//Buscamos los productos este endpoint es despleado para la pagina web
router.post('/load', (req, res) => {
    
    var Vsorts = {};
    var Vfilters = {};
    var result = {}
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i'); 
    if(req.body.category != ""){ Vfilters["categories"] = req.body.category; }
    if(req.body.brand != ""){ Vfilters["idBrand"] = req.body.brand; }
    if(req.body.supplier != ""){ Vfilters["idSupplier"] = req.body.supplier; }

    //console.log(Vfilters);
    var rPerFind = 0;
    var NPages = 220;

    if(req.body.numPages == 1000000){
        //Consultamos cuantos registros hacen parte de la busqueda solicitada 
        Products.find(Vfilters,{_id:0,sku:1,name:1,images:1,pvp:1,cost:1,idTax:1,idBrand:1,idSupplier:1}).sort(Vsorts).countDocuments()
        .then(
            count => {
                rPerFind = count;
                NPages = Math.ceil(count/parseInt(req.body.limit));
            }
        );
    }else NPages = req.body.numPages;
    
    //Calculamos los registros que deveran ser excluidos en la paginacion de la consulta 
    const pageNumber = parseInt(req.body.pag);
    const nPerPage = parseInt(req.body.limit);
    const skypPage = pageNumber>0?((pageNumber-1)*nPerPage):0;

    Products.find(Vfilters,{_id:0,sku:1,name:1,images:1,pvp:1,cost:1,idTax:1,idBrand:1,idSupplier:1}).sort(Vsorts).skip(skypPage).limit(parseInt(req.body.limit))
    .then(function(response){
        result["info"] = {
            category:req.body.category,
            RegPerFind:rPerFind,
            RegInPage:response.length,
            NumPages:NPages,
            limit:parseInt(req.body.limit),
            pag:parseInt(req.body.pag)
        }
        result["data"] = response;
        res.status(200).send(result);
    });
});

router.post('/test', (req, res) => {
    res.send("hola Juan");
    //Orders.find()
    //.exec()
    //.then(x => res.status(200).send(x));
});

//Creamos el objeto que sera utilizado como filtros de las tablas
router.post('/filters', function(req, res){
    var Vfilters = {};
    var result = {}

    if(req.body.rol != undefined && req.body.rol != "" && req.body.rol != 1 && req.body.rol != 2)
        if(req.body.idSupplier != undefined && req.body.idSupplier != "") Vfilters["idSupplier"] = req.body.idSupplier;

    Products.find(Vfilters).distinct("idBrand").then(function(response){
        var auxBrands = [];
        Brands.find().sort({name:1}).then(function(brands){
            for(var i=0; i<response.length; i++){
                for(var j=0; j<brands.length; j++){
                    if(response[i] == brands[j]._id){
                        auxBrands.push(brands[j]);
                        break;
                    } 
                }
            }
            auxBrands.unshift({_id:"all", name:"Todas las Marcas"});
            result["brands"] = auxBrands;
            Products.find(Vfilters).distinct("idSupplier").then(function(proSuppliers){
                var auxSupplier = [];
                Suppliers.find().sort({name:1}).then(function(reSuppliers){
                    for(var i=0; i<proSuppliers.length; i++){
                        for(var j=0; j<reSuppliers.length; j++){
                            if(proSuppliers[i] == reSuppliers[j]._id){
                                auxSupplier.push(reSuppliers[j]);
                                break;
                            } 
                        }
                    }
                    auxSupplier.unshift({_id:"all", name:"Todas los Proveedores"});
                    result["suppliers"] = auxSupplier;
                    Products.find(Vfilters).distinct("idTax").then(function(proTaxes){
                        var auxTax = [];
                        Taxes.find().sort({value:1}).then(function(reTaxes){
                            for(var i=0; i<proTaxes.length; i++){
                                for(var j=0; j<reTaxes.length; j++){
                                    if(proTaxes[i] == reTaxes[j]._id){
                                        auxTax.push(reTaxes[j]);
                                        break;
                                    } 
                                }
                            }
                            auxTax.unshift({_id:"all", name:"Todas los Impuestos"});
                            result["taxes"] = auxTax;
                            res.status(200).send(result);
                        })
                    });
                });
            });
        });
    });

});

router.put('/update', (req, res) => {
    Products.update({_id:req.body._id}, req.body)
    .then(x => {
        x["update"] = {_id:req.body._id};
        res.status(201).send(x)
    })
    .catch(x => res.status(401).send(x));
})

router.put('/add', (req, res) => {
    Products.create(req.body)
    .then(x => res.status(201).send(x))
    .catch(x => res.status(401).send(x));
})

router.put('/delete', (req, res) => {
    Products.deleteOne({_id:req.body._id})
    .then(x => {
        x["update"] = {_id:req.body._id};
        res.status(201).send(x)
    })
    .catch(x => res.status(401).send(x));
})

router.delete('/:id', (req, res) => {
});

router.post('/:sku', (req, res) => {
    Products.find({sku:req.params.sku},{_id:0,sku:1,name:1,description:1,sDescription:1,images:1,pvp:1,idTax:1,cost:1,idBrand:1,idSupplier:1,dimensions:1,bDimensions:1})
    .then(function(product){
        product["brandName"] = req.params.brandName;
        res.status(200).send(product);
    });
});

module.exports = router