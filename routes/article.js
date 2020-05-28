'use strict'

var express = require ("express");
var ArticleController = require("../controllers/article");// Salgo de article routes y entro a la carpeta controllers / article
var router = express.Router();// Traemos el metodo Router() de express a la var router
var multipart = require("connect-multiparty");// Cargamos el modulo multiparty 
var md_upload = multipart({uploadDir:'./upload/articles'});//Obtemenos con el multiparty un midleware q es una funcionalidad q se ejecuta antes del metodo q esta asignado a la ruta (upload)
                // Pasamos como parametro el uploadDir para q guarde los archivos en esa ruta ('./upload/articles') en esa carpeta
                // Lo siguiente q hay q hacer es aplicar ese Middleware a la ruta requerida en este caso la del upload
// RUTAS DE PRUEBAS: 

//Creamos una ruta por get q sera la de (test) 
router.get('/test', ArticleController.test);// Usamos la clase ArticleController q es el objeto q contine la ruta y su metodo test
//Creamos una ruta por post q sera la de (datos-Curso)
router.post('/datos-Curso', ArticleController.datosCurso);//Usamos la clase ArticleController y su metodo test

/*
El GET se usa para sacar datos de la base de datos
El POST para guardar o enviar cosas a la bd o al backend
El PUT para actualizar
El DELETE para borrar
*/
//RUTAS UTILES:
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);//el /:last? es un parametro opcional
router.get('/article/:id', ArticleController.getArticle);//el /:id es un parametro obligatorio
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id?',md_upload, ArticleController.upload);// Como segundo param pasamos el Middleware creado arriba
router.get('/get-image/:image', ArticleController.getImage);//el /:image es un parametro image obligatorio
router.get('/search/:search', ArticleController.search);


module.exports = router;// Exportamos este modulo para poder usarlo fuera de este archivo y asi tener estas rutas en cualquier parte (app.js)