const express = require('express')
const router = express.Router();
const Catalogue = require('../models/Catalogue.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => { 
    Catalogue.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:id', (req, res) => {
    //res.send(req.params.id)
    Catalogue.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})

router.post('/', function(req, res){
    Catalogue.create(req.body)
    .then(x => res.status(201).send(x)); 
})

router.put('/:id', (req, res) => {
    Catalogue.findOneAndUpdate(req.params.id, req.body)
    .then(x => res.status(204).send(x));
})

router.delete('/:id', (req, res) => {
    Catalogue.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
})

module.exports = router