const express = require('express')
const router = express.Router();
const Groups = require('../models/Groups.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    Groups.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:group', (req, res) => {
    Groups.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})

router.post('/', function(req, res){
    Groups.create(req.body)
    .then(x => res.status(201).send(x)); 
})

router.post('/find', (req, res) => {
    //res.send(req.body.files[0].file);
    var Vsorts = {};
    var Vfilters = {};
    
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    //Recorremos todos los filtros que se piden
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i');

    //res.send(Vfilters);
    Groups.find(Vfilters).sort(Vsorts).limit(parseInt(req.body.limit))
    .exec()
    .then(x => res.status(200).send(x));
})

module.exports = router