'use strict'
var validator = require("validator");
var fs = require('fs');//Requerimos el fs para borrar los archivos 
var path = require('path');//Requerimos el path para sacar la ruta de un archivo en esl sistema de archivos en el servidor
var Article = require("../models/article");

var controller = {// creamos el objeto controllers q sera un JSON

    // Creamos los metodos necesarios

    datosCurso: (req, res) => {//El metodo get tiene dos parametros ( 1- la ruta en si, 2 - parametro es uan funcion callback )
        //Devolvemos el codigo 200 como respuesta exitosa y un JSON
        var hola = req.body.hola;
        return res.status(200).send({

            curso: "Master en FrameWorks JS",
            autor: "Deiby Salamanca",
            url: "https://www.caracoltv.com/",
            hola
        });
    },

    test: (req, res) => {

        return res.status(200).send({
            message: "Soy el metodo test de mi controlador"
        });
    },

    // Metodo q permite crear y guardar un nuevo articulo
    save: (req, res) => { // Desoues tenemos q ir a routes para crear cada ruta de estos metodos.
        // Recogemos los parametros por POST (lo q el usuario envie desde la peticion)
        var params = req.body;// Recogemos lo que llegue por el body
        //console.log(params); PRUEBA

        // Validar datos con la libreria del (validator)
        //Tenemos q importar arriba el validator (require) para validar cualquier tipo de dato
        // Importamos el modelo o clase con la cual vamos a crear los objetos y  guardar los articulos models/article
        // Devemos meter todo en un try catch por si causa alguna exeption
        try {//
            var validate_title = !validator.isEmpty(params.title);// la var dara true cuando no este vacio params.title
            var validate_content = !validator.isEmpty(params.content);//la var dara true cuando no este vacio params.content
            //***** LAS VALIDACIONES Q SE PUEDEN HACER CON validator SE PUEDEN CONSULTAR https://www.npmjs.com/package/validator */
        } catch (err) {// Si ocurre algun error entonces devolvemos el resultado q tengamos dentro del catch
            return res.status(200).send({//Recogemos los parametros del articulo
                status: "error",
                message: "Faltan datos por enviar en este codigo tambien"
            });
        }
        if (validate_title && validate_content) {// Si las validaciones dan true
            /*return res.status(200).send({//Recogemos los parametros del articulo
              message: "Validacion Correcta"
            }); Hacer la prueba con el potsman y enviar los dos parametros y solo una para ver los resultados */

            // Crear el objeto (articulo) q queremos guardar para eso usamos el modelo
            var article = new Article();// Instanciamos el objeto q hemos creado en el modelo

            // Asignar valores al nuevo objeto creado
            article.title = params.title;//Le pasamos como valor a la propiedad de title lo q nos llegue como parmetro de title
            article.content = params.content;
            // NOTA: El valor del date se asigna automaticamente en el modelo
            if(params.image){//Si params.image es true (es decir, que nos llega) entonces le damos un valor
                article.image = params.image;
            }else{//Si no le damos el valor null
                article.image = null;
            }
            // En este momento podemos hacer la prueba para ver lo q devuelve pero aun sin estar guardado bd.
            /* return res.status(200).send({//Recogemos los parametros del articulo
                 status: "success",
                 article // esto nos devuelve una propiedad article con el objeto por dentro
             });*/

            // Guardar el articulo en la bd para esto usamos el objeto q acabamos de crear
            article.save((err, articleGurdado) => {//El primer parm un error en caso de q suceda y como 2 param el articleGurdado por si seguardo en la bd

                if (err || !articleGurdado) { // si se produce un error o articleGuardado lo devuelve falso (nada)
                    return res.status(404).send({//Recogemos los parametros del articulo
                        status: "error",
                        message: "El articulo no se ha guardado"
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({//Recogemos los parametros del articulo
                    status: "success",
                    article: articleGurdado // esto nos guarda una article en la base de datos
                });
            });

            //NOTA en este momento podemos probar en postman y en robo3t para ver si se guarda el articulo


        } else {
            return res.status(200).send({//Recogemos los parametros del articulo
                status: "error",
                message: "Los datos no son validos"
            });
        }

    },



    //*********************************************************************************************************** 

    getArticles: (req, res) => {//Despues de crear este metodo creamos la ruta en routes/article
        //Tenemos q hacer una Find para sacar los datos de la BD
        //Usamos el modelo y el metodo Find que puede tener parametros de busqueda por id o por nombre o lo q sea 
        var query = Article.find({}) // creamos la consulta
        // console.log("Este es el metodo getarticles completo");
        var last = req.params.last;//Recogemos el parametro opcional last q enviamos por la url
        // console.log(last);

        if (last || last != undefined) {//si last da true (es decir q recibe el parametro) o es diferente a undefined

            query.limit(3);//Usamos la funcion limit, para limitar los articulos q muestra.

        }
        // NOTA: si no pasamos parametros en la url nos devolvera todos los registros 
        //http://localhost:3900/api/articles
        //http://localhost:3900/api/articles/parametro

        query.sort("-_id").exec((err, articles) => {// el metodo sort me orderna del mas nuevo al mas viejo

            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: " error al devolver los articulos  "
                });
            }
            if (!articles) {// Error cuando no hay articles
                return res.status(404).send({
                    status: "error",
                    message: " No hay articulos para mostrar"
                });
            }

            return res.status(200).send({
                status: "sucess",
                articles
            });


        });
    },
    //********************************************************************************************************** */
    // Metodo para sacar los  ultimos articulos
    /* 
    lastArticles:(req, res) => {//Despues de crear este metodo creamos la ruta en routes/article
        //Tenemos q hacer una Find para sacar los datos de la BD
        //Usamos el modelo y el metodo Find que puede tener parametros de busqueda por id o por nombre o lo q sea 
      var query = Article.find({}) // creamos la consulta
      var last = req.params.last;//Recogemos el parametro opcional last q enviamos por la url
      console.log(last); 
    /*  console.log("Este es el metodo nuevo  lastArticles ");
        var last = req.params.last;//Recogemos el parametro opcional last q enviamos por la url
        console.log(last); 
    
      if(last || last != undefined){//si last da true (es decir q recibe el parametro) o es diferente a undefined
    
        query.limit(2);//Usamos la funcion limit, para limitar los articulos q muestra.
    
      }
    // NOTA: si no pasamos parametros en la url nos devolvera todos los registros 
      //http://localhost:3900/api/articles
      //http://localhost:3900/api/articles/parametro
        
     /* query.sort("-_id").exec((err, articles)=>{// el metodo sort me orderna del mas nuevo al mas viejo
    
            if (err){
                return res.status(500).send({
                    status: "error",
                    message: " error al devolver los articulos  "
                });
            }
            if (!articles){// Error cuando no hay articles
                return res.status(404).send({
                    status: "error",
                    message: " No hay articulos para mostrar"
                });
            }
    
            return res.status(200).send({
                status: "sucess",
                articles
        });
    
    
    });
    },
    */
    //*********************************************************************************************************** 

    // Metodo para sacar un unico articulo en especifico
    getArticle: (req, res) => {
        // Recogemos el id de la url
        var articleId = req.params.id; // Recogemos el id que nos llega por la url en la var articleId
        // Comprobar q existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: "error",
                message: " No existe el articulo"
            });
        }

        // Si no entra en la anterior condicion entonces .... Buscamos el articulo
        Article.findById(articleId, (err, article) => {//Como 1 pasamos el articleID y como 2 una funcion callback

            if (err || !article) {// Si se produce un error o Si no llegan articulos devolvemos un mensaje
                return res.status(500).send({
                    status: "error",
                    message: "Error al devolver los datos"
                });
            }

            // Devolverlo en JSON
            return res.status(200).send({// Si es exitoso que nos devulva el article
                status: "sucess",
                article //Devolvemos el article
            });

        });
        //HACEMOS UNA PRUEBA EN EL POTSMAN PARA VERIFICAR SI NOS DEVUELVE EL ID CORRECTO Y LOS MENSAJES DE ERROR EN CASO DE NO ENVIAR PARAMETROS
    },

    //*********************************************************************************************************** 

    // Metodo para actualizar articulos
    update: (req, res) => {
        // Recoger el id del articulo por la URL
        var articleID = req.params.id;
        // Recoger los datos que llegan por put
        var params = req.body;
        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);// Cuando (params.title) no este vacio, validate_title sera true
            var validate_content = !validator.isEmpty(params.content);// Cuando (params.content) no este vacio, validate_content sera true


        } catch (err) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        if (validate_title && validate_content) {// si (validate_title) y (validate_content) dan true haremos el Find and update
            // Cuando sean validos, hacemos la consulta. Find and update
            //Usamos el modelo y el metodo q busca y actualiza pasandole el parametro q pasamos por la url y despues pasamos los parametros     
            //q quiero actualizar, y como tercer parametro {new:true} q nos devulve el objeto actualizado y no el objeto q estaba anteriormente 
            //y por ultimo pasamos un funcion callback q devuleva un error o el articulo actualziado
            Article.findOneAndUpdate({ _id: articleID }, params, { new: true }, (err, articleActualizado) => {
                if (err) {
                    return res.status(500).send({// Si es exitoso que nos devulva el article
                        status: "error",
                        message: "Error al actualizar !!!"
                    });
                }
                if (!articleActualizado) {//Si no llega articleActualizado 
                    return res.status(500).send({// Si es exitoso que nos devulva el article
                        status: "error",
                        message: "No existe el articulo !!!"
                    });
                }

                //Si no entra en ninguna condicion anterior entonces enviamos una respuesta exitosa
                return res.status(200).send({// Si es exitoso que nos devulva el article
                    status: "success",
                    article: articleActualizado
                });
                //NOTA: Hacer la pruba enviando la ruta PUT con el id, los parametros requeridos en la opcion body y x-www-form-urlencoded de potsman

            });

        } else {
            // Devolver respuesta
            return res.status(200).send({// Si es exitoso que nos devulva el article
                status: "error",
                message: "La validacion no es correcta !!!"
            });
        }

    },

    //*********************************************************************************************************** 

    // Metodo para eliminar articulos
    delete: (req, res) => {
        // Recoger el id de la url
        var articleID = req.params.id;
        //Find and Delete Buscar el articulo y eliminarlo
        //Usamos el modelo Article con el metodo findOneAndDelete y pasamos como parametros las condiciones q el campo _id
        //sea exactamente igual al articleID y como segundo parametro un callback
        Article.findOneAndDelete({ _id: articleID }, (err, articleEliminado) => {

            if (err) {// Si ocurre algun error
                return res.status(500).send({
                    status: "error",
                    message: "Error al borrar !!!"
                });
            }

            if (!articleEliminado) {// Si no me llega ningun articulo borrado
                return res.status(404).send({// Si es exitoso que nos devulva el article
                    status: "error",
                    message: "NO se ha borrado el articulo, posiblemente no existe !!!"
                });
            }

            return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                status: "success",
                article: articleEliminado
            });
        });
        // NOTA: PROBAR EN POTSMAN CON DELETE Y PASANDOLE LA RUTA CON PARAMETRO ID CORRESPONDIENTE Y VERIFICAR EL OBJETO ELIMINADO EN ROBO3T.

    },

    //*********************************************************************************************************** 

    // Metodo subida de archivo q ha sido modificado por el pluging o libreria que hemos cargado en la aplicacion
    upload: (req, res) => {
        // Configurar el modulo de connect multiparty en el router/article.js
        // VAMOS AL ARCHIVO article.js de la carpeta routes (YA ESTA HECHO)
        // Recoger el fichero de la peticion q enviamos nosotros
        var file_name = "Imagen no subida...";// devolveremos este mensaje en caso q la imagen no suba
        //console.log(req.files); // Comprobamos q el fichero nos llegue pasando como respuesta el fichero: req.files, ir a potsman y en form-data en key=image y value=tipo file
        if (!req.files) {// Si no llega req.files quiere decir q no hay ningun archivo
            return res.status(404).send({// Enviar una respuesta gracias al metodo send
                status: "error",
                message: file_name
            });
        }
        // Conseguir el nombre y la ext del archivo
        var file_path = req.files.file0.path; // Le ponemos file0 como nombre a lo q le vamos a enviar por temas de librelias y sacamos el path del archivo por ultimo
        var file_split = file_path.split('/'); //Dividir el path en trozos y quedarnos con el nombre gracias al metodo split
        // Probamos en el potsman en viando como param key = file0 y tipo = File y vemos q la propiedad split nos divide en 3 trozos.
        //ADVERTENCIA EN LINUX O MAC SERA var file_split = file_path.split('/');

        // Nombre del archivo que usaremos para guardarlo en la bd
        var file_name = file_split[2];// Sacamos del file_split el elemento con indice 2

        // Sacamos la ext del fichero para comprobar si es un fichero valido
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1]; // De esta manera conseguimos la ext.

        //NOTA = CON EL MULTYPARTY SIEMPRE SE GUARDARAN LOS DOCUMENTOS Y ESTO LO HACEMOS CON LA LIBRERIA fs

        //Comprobar la ext para q solo sean imagenes, y si no es valida la ext entonces borrar el fichero
        if(file_ext == 'PNG'){
            file_ext= 'png'
        }//Convertimos el PNG a png
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'  && file_ext != 'mp4') {
            // para borrar el archimo importamos el modulo fs
           console.log("Este es el archivo extencion q llega en verdadero" +  file_ext);
            fs.unlink(file_path, (err) => {// Usamos el objeto de file sistem y su metodo unlink para eliminar un archivo, pasamos el file_path completo para eliminar, a la ruta fisica del servidor
                return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                    status: "error",
                    message: "La ext de la imagen es incorrecta"+file_ext

                });
            });

        } else {
            console.log("Este es el archivo extencion q llega en false " +  file_ext);
            //Sacamos el param id q llega por la url
            var articleId = req.params.id;

            if (articleId) {//Si article existe

                // Si todo es valido, buscamos el articulo, asignarle el nombre de la imagen y actualizarlo
                Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articuloSubido) => {// Actualizamos el articulo cuyo id llega por la url como primer param
                    //como segundo el objeto q queremos actualizar, es decir creamos un objeto para actualizarlo y el unico cambio sera  
                    //la propiedad image y le pasamos el file_name el nombre del archivo q queremos guardar y como tercer param pasamos
                    //{new:true} para q nos devuelva el objeto actualizado toralmente, q no devuelva la version anterior y el 4 es funcion calback 

                    if (err || !articuloSubido) {//Si llega un error o no llega el articulo actualizado 
                        return res.status(404).send({// Si es exitoso que nos devulva el article eliminado
                            status: "error",
                            message: "Error al guardar la imagen del articulo"

                        });
                    }

                    return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                        status: "success",
                        article: articuloSubido
                    });
                });
            } else {
                return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                    status: "success",
                    image: file_name //Nos devuelve el archivo subido en el caso hacer la peticion ajax pero
                    // no envie el id del articulo completo, de esta manera podemos ir a article-new.component.ts

                });
            }




        }

    }, // Final del metodo unload 


    //*********************************************************************************************************** 

    // Metodo q permite sacar la imagen del backend o api

    getImage: (req, res) => {
        // Sacamos el fichero q llega por la url
        var file = req.params.image;
        // Sacamos la ruta completa del archivo
        var path_file = './upload/articles/' + file;//Sacamos el path con la ruta completa ('./uploads/articles'+file)

        // Comprobamos si el fichero existe realmente
        fs.exists(path_file, (exists) => {// Usamos la libreria fs y el metodo exist, le pasamos la ruta completa, y la fun calback
            // console.log(exists);
            //Pasandole el parametro exists y comprobar si el archivo existe o no,.
            if (exists) { // Si existe devolvemos una respuesta positiva u devolvemos un fichero

                return res.sendFile(path.resolve(path_file));// Si es exitoso usamos la libreria del path y devolvemos el 
                //fichero en crudo para directamente incrustarlo en etiquetas de imagen
                // El metodo sendFile existe dentro de express y pasamos el metodo resolve de la libreria path y esto nos
                // resuelve una ruta y nos saca el fichero como tal.

            } else {// Si no mandamos un mensaje de error
                return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                    status: "success",
                    message: "La imagen no existe"
                });
            }
        });
    },


    //*********************************************************************************************************** 
    // Metodo buscador de articulos en la api
    search: (req, res) => {

        // Sacar el string a buscar 
        var searchString = req.params.search;// Capturamos el parametro search que llega por la url
        // Find or, para hacer varias condiciones y sacar el articulo de la base de datos
        Article.find({
            "$or": [// Metemos las condiciones con el operador or de mongodb entre []
                { "title": { "$regex": searchString, "$options": "i" } },//Metemos este objeto con una condicion, cuando el titulo corresponda a una $regex del searchString
                // es decir,si el searchString esta incluido dentro del title o dentro del content entonces te sacaremos los articulos que coincidan con eso
                { "content": { "$regex": searchString, "$options": "i" } }
            ]
        })

            .sort([['date', 'descending']])//Este metodo ordena por la fecha y de manera descendente esto dentro del array
            .exec((err, articles) => {// el metodo exec nos ejecuta la query y nos saque los datos de la base de datos con calbak con el error o los articulos q ha encontrado

                if (err) {
                    return res.status(500).send({// Si existe un error, mostramos un mensaje
                        status: "error",
                        message: " Error en la Peticion"
                    });
                }
                if (!articles || articles.length <= 0) {// Si no existe el articulo o arti es igual o menor a 0mostramos el mensaje
                    return res.status(404).send({
                        status: "error",
                        message: " No hay articulos q coincidan con tu busqueda"
                    });
                }

                return res.status(200).send({// Si es exitoso que nos devulva el article eliminado
                    status: "success",
                    articles
                });
            });

    }

}; // Final del Controllers

module.exports = controller; // exportamos los metodos fuera de este archivo para usar estos metodos en el archivo de rutas