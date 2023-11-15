const Joi = require("joi");

// const id = Joi.string().uuid(); //utiliza 2 librerias para validar el id: string y uuid
const id = Joi.number().integer(); //utiliza 2 librerias para validar el id: string
const titulo = Joi.string().min(1).max(200); //utiliza 3 validaciones: minimo 1 caracter, maximo 200 caracteres y tiene que ser un string

const nombre = Joi.string().min(1).max(500); //valida que sea un string, minimo 1 caracter, maximo 500 caracteres y es requerido
const nacimiento = Joi.date(); //valida que sea una fecha
const fallecimiento = Joi.date().allow(null); //valida que sea una fecha y permite que sea null


const fecha_inicio = Joi.string().min(1).max(200); //valida que sea un string, minimo 1 caracter, maximo 200 caracteres
const fecha_fin = Joi.string().min(1).max(200); //valida que sea un string, minimo 1 caracter, maximo 200 caracteres
const tecnica = Joi.string().min(1).max(200) //valida que sea un array de strings

const altura = Joi.number().precision(1).min(0); //valida que sea un numero 
const anchura = Joi.number().precision(1).min(0); //valida que sea un numero
const unidad = Joi.boolean(); //valida que sea un string
//valida que sea un objeto con 3 validaciones: altura, anchura y unidad, altura es un numero, anchura es un numero, unidad es un string
const estilo = Joi.string().min(1).max(200); //valida que sea un string, minimo 1 caracter, maximo 200 caracteres
const colecciones = Joi.string().min(1).max(200); //valida que sea un array de strings

const valoracion_criticos = Joi.number().precision(1).min(0).max(5); //valida que sea un numero, precision de 1, minimo 0, maximo 5
const valoracion_usuarios = Joi.number().precision(1).min(0).max(5); //valida que sea un numero, precision de 1, minimo 0, maximo 5

//Crear una pintura
const createPinturaSchema = Joi.object({
  titulo: titulo.required(),
    nombre: nombre.required(),
    nacimiento: nacimiento.required(),
    fallecimiento: fallecimiento.optional(),
  fecha_inicio: fecha_inicio.required(),
  fecha_fin: fecha_fin.required(),
  tecnica: tecnica.required(),
    altura: altura.required(),
    anchura: anchura.required(),
    unidad: unidad.required(),
  estilo: estilo.required(),
  colecciones: colecciones.required(),
    valoracion_criticos: valoracion_criticos.required(),
    valoracion_usuarios: valoracion_usuarios.required(),
});

//Actualizar una pintura
const updatePinturaSchema = Joi.object({
  titulo: titulo.optional(),
    nombre: nombre.optional(),
    nacimiento: nacimiento.optional(),
    fallecimiento: fallecimiento.optional(),
  fecha_inicio: fecha_inicio.optional(),
  fecha_fin: fecha_fin.optional(),
  tecnica: tecnica.optional(),
    altura: altura.optional(),
    anchura: anchura.optional(),
    unidad: unidad.optional(),
  estilo: estilo.optional(),
  colecciones: colecciones.optional(),
    valoracion_criticos: valoracion_criticos.optional(),
    valoracion_usuarios: valoracion_usuarios.optional(),
});

const getPinturaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPinturaSchema,
  updatePinturaSchema,
  getPinturaSchema,
};
