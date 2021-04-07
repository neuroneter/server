const express = require('express')
const router = express.Router();
const Suppliers = require('../models/Suppliers.js');
const listAccess = require('../corsOptions/listAccess.js');
const cors = require('cors');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    Suppliers.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:id', (req, res) => {
    //res.send(req.params.id)
    Suppliers.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})
//cors(listAccess),
//Por pagina
router.post('/find', (req, res) => {

    //res.send("hola muncdo");
    
    var Vsorts = {};
    var Vfilters = {};
    var Registros = 0;
    
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    //Recorremos todos los filtros que se piden
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i');    

    var rPerFind = 0;
    var NPages = 220;

    //Consultamos cuantos registros hacen parte de la busqueda solicitada 
    Suppliers.find(Vfilters).sort(Vsorts).count()
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

    //res.send(Vfilters);
    Suppliers.find(Vfilters).sort(Vsorts).skip(skypPage).limit(parseInt(req.body.limit))
    .then(x => res.status(200).send({
        info:{
            RegPerFind:rPerFind,
            NumPages:NPages,
            limit:parseInt(req.body.limit),
            pag:parseInt(req.body.pag)
        },
        data:x
    }));

})

router.post('/', function(req, res){
    Suppliers.create(req.body)
    .then(x => res.status(201).send(x)); 
})

router.put('/:id', (req, res) => {
    Suppliers.findOneAndUpdate(req.params.id, req.body)
    .then(x => res.status(204).send(x));
})

router.delete('/:id', (req, res) => {
    Suppliers.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
})

module.exports = router