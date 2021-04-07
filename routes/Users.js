const express = require('express')
const router = express.Router();
const Users = require('../models/Users.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    Users.find()
    .exec()
    .then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
})

router.post('/', function(req, res){
    Users.create(req.body)
    .then(x => res.status(201).send(x)); 
})

//Busqueda de usuarios del backoffice que estan autorizados para ser Agentes de representación 
router.get('/find/agent',function(req, res){
    Users.find({agent:true},{_id:1,name:1})
    .then(x => res.status(200).send(x));
});

router.post('/find', function(req, res){
    //Consultamos cuantos registros hacen parte de la busqueda solicitada 
    Users.find({"email":req.body.email})
    .then(users => res.status(200).send(users));
})

router.put('/:id', (req, res) => {
    Users.findOneAndUpdate(req.params.id, req.body)
    .then(x => res.status(204).send(x));
})

router.delete('/:id', (req, res) => {
    Users.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
})

module.exports = router