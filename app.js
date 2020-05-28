'use strict'
// Cargar modulos de node para crear el servidor

var express = require("express"); //Modulo q permite crear el servidor
var bodyParser = require("body-parser");// Modulo q al recibir una peticion convierte esos datos en un objeto usable por javascript
var path = require('path');
// Ejecutar Express  para trabajar con (http)

var app =  express();//Express va a ser la aplicacion en si... luego esto es lo q vamos a exportar.
// Cargar archivos Rutas

var article_routes = require('./routes/article');// Cargamos el archivo de las rutas en la variable article_routes

/***************************************************************************/
/*      ESTA ES OTRA MANERA DE CONFIGURAR LAS RUTAS SI LAS TUVIERAMOS EN ESTE MISMO ARCHIVO
 Ruta o metodo de prueba para el API REST
 Cuando abrimos una URL en el navegador estamos usando el METODO GET...
 req los parametros q resivo y la res lo que devuelvo....
app.get('/prueba', (req, res)=>{//El metodo get tiene dos parametros ( 1- la ruta en si, 2 - parametro es uan funcion callback )
    console.log("Hola Mundo");
});



app.post('/prueba2', (req, res)=>{//El metodo get tiene dos parametros ( 1- la ruta en si, 2 - parametro es uan funcion callback )
   //Devolvemos el codigo 200 como respuesta exitosa y un html lista ordenada como plantilla de javascript

   return res.status(200).send(`
    <ul>
    <li> Node JS </li>
    <li> Angular </li>
    <li> React </li>
    <li> Vue </li>

    </ul>
   `);
});


app.get('/prueba3', (req, res)=>{//El metodo get tiene dos parametros ( 1- la ruta en si, 2 - parametro es uan funcion callback )
    //Devolvemos el codigo 200 como respuesta exitosa y un JSON
    return res.status(200).send({

        curso: "Master en FrameWorks JS",
        autor: "Deiby Salamanca",
        url: "https://www.caracoltv.com/"
     });
 });

 
app.post('/prueba4', (req, res)=>{//El metodo get tiene dos parametros ( 1- la ruta en si, 2 - parametro es uan funcion callback )
    //Devolvemos el codigo 200 como respuesta exitosa y un JSON
    var hola = req.body.hola;  
    return res.status(200).send({

        curso: "Master en FrameWorks JS",
        autor: "Deiby Salamanca",
        url: "https://www.caracoltv.com/",
        hola
     });
 }); 
 */

/***************************************************************************/





// Cargar Middlewares Esto es algo q se ejecuta antes de cargar una ruta o una url de la aplicacion.

app.use(bodyParser.urlencoded({extended: false})); // esto es cargar el bodyParser, es decir utilizarlo.
app.use(bodyParser.json()); // Convertimos cualquier peticion q llegue en un JSON para poder usarlo...


// CORS que es para permitir peticiones desde el frontend
// El cors es el acceso cruzado entre dominios, para permitir las llamadas http o  peticiones ajax o llamas asincronas al api
// desde cualquier frontend, desde el frontend que tengamos en otra ip diferente, si no lo configuramos entonces cuando hagamos una peticion
// lo q va hacer el api es bloquear esas peticiones y no va a devolver ningun resultado al frontend.

/* 1) Entramos al navegador web y ponemos la ulr 
 https://victorroblesweb.es/ y en el buscador ponemos cors y pegamos el trozo de codigo.
 Esto es un Middleware q se ejecuta antes de cada una de las rutas y metodos q tengamos el next() nos permite continuar con cada ejecucion que haya q hacer
*/
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//app.use(express.static(path.join(__dirname, 'client')));//Creamos este Middleware que carga un archivo path.join que esta en el directorio _dirname, y la carpeta 'client'
app.use('/',express.static('client', {redirect: false}));//Cuando cargue la ruta /, entonces carga un ficher estatico (express.static) le indicamos cual carpeta debe cargar de 
// manera estatica y cogera el arch .index y le pasamos un segundo param q es un json para que no haga ningun tipo de redireccion.
// Añadir prefijos a las rutas y Cargar rutas
// Usamos las rutas de esta manera, primer parametro opcional '/api', 2 parametro cargando el article_routes
app.use('/api',article_routes); 


app.get('*', function(req,res,next){
    res.sendFile(path.resolve('client/index.html'));
});//Cuando se cargue la ruta q no sea (/ ó /api) entonces entramos a la function(res,req,next) y le decimos q devuelva como respuesta un archivo
//con el metodo sendFile y le pasamos el path.resolve q revuleve el archivo index.html, asi cuando carguemos una ruta q nosea ninguna de las dos anteriores
//nos cargara este index.htlm y con esto ya se actualizara automaticamente en la ruta q me encuentre(blog, home, form etc).



// Exportar modulo q es el fichero Actual para usarlo fuera y cargar este app en el index y hay poder lanzar el servidor a escuchar.
module.exports = app;// Exportamos el modulo, esto permite usar el objeto q acabamos de crear fuera de este fichero.