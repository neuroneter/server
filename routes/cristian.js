const express = require('express')
const router = express.Router();

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    res.send(req.query.mensaje+" hola Cristian");
})


router.post('/', (req, res) => {
    console.log(req)
    res.send(req.body.mensaje+" hola Cristian");
})

module.exports = router