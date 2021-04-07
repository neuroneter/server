const express = require('express')
const router = express.Router();
const Divipola = require('../models/Divipola.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => { 
    Divipola.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:id', (req, res) => {
    //res.send(req.params.id)
    Divipola.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})

router.post('/', function(req, res){
    Divipola.create(req.body)
    .then(x => res.status(201).send(x)); 
})

router.put('/:id', (req, res) => {
    Divipola.findOneAndUpdate(req.params.id, req.body)
    .then(x => res.status(204).send(x));
})

router.delete('/:id', (req, res) => {
    Divipola.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
})

module.exports = router