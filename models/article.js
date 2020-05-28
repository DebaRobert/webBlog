'use strict'

var mongoose = require('mongoose');//Requerimos Mongoose
var Schema = mongoose.Schema; // Para usar el objeto de este tipo

//Definimos la estructura q van a tener cada objetos y documentos de este tipo q estarems guardando y utilizando
var ArticleSchema = Schema({//A este objeto le pasaremos un objeto JSON con la configuracion del esquema con la propiedades
// q tendra mi objeto a nivel de javascript en el backend con node y a nivel del objeto q se guardara en la bd con mongo 
// UN ARTICULO TENDRA:

    title: String, // Propiedad y tipo de dato.
    content: String,
    date: {
        type: Date,
        default: Date.now //Esto me gaurdara por defecto la fecha actual en la q se guarde.
        },
    image: String// Un campo imagen donde guardaremos tambien un string por q aca guardaremos la ruta de la imagen q asignaremos al articulo


});
// Aca definimos el modelo con 1 parametro (nombre del modelo) y 2 parametro (El esquema q usaremos para ese modelo)
// Es decir q cada documento q guardemos en la bd sera un Article y usaremos dentro de esa coleccion de datos el esquema
// de ArticleSchema
module.exports = mongoose.model('Article', ArticleSchema);
// Cuando mongoose guarda un documento lo q hace es pluralizar el Article y lo pone en minusculas 
// Crea una coleccion llamada article y dentro guarda los documentos de este tipo y con  esta estructura en la coleccion

//Ahora solo quedaria exportarlo como un modulo para poder importarlo en los diferentes archivos q tengamos en el backend
// y a si poder crear objetos nuevos o utilizar simplemente el modelo para conectarnos mediante él a su colexion de datos
// en la base de datos y usar el metodo find, y diferentes metodos para hacer el CRUD, por ejemplo.
// Por eso es importante q por cada coleccion de datos q tengamos en nuestra BD, tengamos un modelo para poder interactuar
// con la BD por q esto nos da la capa de absatraccion intermedia q hace q esto sea un modelo q interactue con la bd y esto
// se encargue internamente de hacer la mejor consulta y nos devuelva el dato correcto  