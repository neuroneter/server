const express = require('express')
const router = express.Router();
const e = require('express');
const ScoreDps = require('../models/ScoreDps.js');
var request = require ('request');
const { response } = require('express');


function score(importedJSON, newCaso, registros){
    importedJSON.forEach(element => {
        //element.forEach(question){

        //}
    });
    //console.log(importedJSON);
}

//Ruta ingreso por defecto
router.post('/', (req, res) => {
    //var objRes = {"score":"223","NumeroDocumento":req.body.NumeroDocumento}
    Vfilters = {NumeroDocumento:req.body.NumeroDocumento} 

    request('https://firebasestorage.googleapis.com/v0/b/blogmoodle-2ef5d.appspot.com/o/caso1.json?alt=media&token=f6f373bd-f21d-40b1-b868-2e20b9620559', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var importedJSON = JSON.parse(body);

            //Preguntamos si exite el cogestor creado en base de datos para obtener el identificador de base 
            ScoreDps.find({NumeroDocumento:req.body.NumeroDocumento}).then(function(response){

                    if(response.length === 0){
                        res.status(201).send('No estas creado como cogestor, solicita el registro con su apoyo tecnológico');
                    } 
                    else{
                        var flag = false;

                        //Recorremos buscando en cada casp las repeticiones exitentes y agregamos la nueva repeticion 
                        response[0].CasosScore.forEach(element => {
                            if(element.Caso == req.body.Caso){
                                flag = true;
                                element.Repetition.push(req.body);
                            } 
                        });

                        //Si la vandera "flag" es false nunca se puedo agregar el nuevo intento al caso esto ya que el caso no existe por lo que procedemos 
                        //a crear el nuevo caso con su intento 
                        if(!flag){
                            var casoTmp = {
                                Caso:req.body.Caso,
                                Repetition:req.body
                            }
                            response[0].CasosScore.push(casoTmp);
                        }
                        score(importedJSON, req.body, response[0]);
                        //ScoreDps.updateOne({_id:response[0].id}, response[0]).then(x => res.status(201).send('233'));
                    }
                    res.status(204).send('233');
                }
            );
        }
    })
})


module.exports = router