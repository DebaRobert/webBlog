'use strict'

var mongoose = require('mongoose');//Requerimos Mongoose
// 1 parametro, URL localhost por q esta local con nombre de base de datos a crear (base_blog)
// 2 parametro en llaves para meter un json {useNewUrlParser: true} permite usar nuevas funcionalidades q incluye mongoose.
// luego usamos el then (Es una promesa)
var app = require('./app');// Cargamos el archivo app.js en la variable app
var port = 3900; //Le decimos el pueto q queremos usar para esta aplicacion.

mongoose.set('useFindAndModify', false); // Desactivamos los metodos antiguos de mongoose para usar los nuevos que trae.
mongoose.Promise = global.Promise; // Es para el funcionamiento interno de mongoose, Esto es para evitar fallos a la hora de conectarnos o a la hora de usar diferentes cosas en mongodb
mongoose.connect('mongodb://localhost:27017/base_blog',{useNewUrlParser: true}).then(()=>{
//mongodb://localhost:27017  = Esta seria la url local
//base_blog                  = Este es el nombre de la base de datos
//{useNewUrlParser: true})   = Esto nos permite usar nuevos metodos, nuevas funcionalidades de mongoose

console.log("Conectada la BD activada y actualizada ultima vez");

                // CREAMOS EL SERVIDOR Y PONERME A ESCUHCAR PETICIONES HTTP
                app.listen(port, ()=>{
                        console.log("Servidor conectado correctamente: "+port);
                });
});