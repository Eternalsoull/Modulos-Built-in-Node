const Joi = require("joi");

const id = Joi.string().uuid(); //utiliza 2 librerias para validar el id: string y uuid

const titulo = Joi.string().min(1).max(200); //utiliza 3 validaciones: minimo 1 caracter, maximo 200 caracteres y tiene que ser un string
const artista = Joi.object({
  nombre: Joi.string().min(1).max(500).required(),
  nacimiento: Joi.date(),
  fallecimiento: Joi.date().allow(null),
}); //valida que sea un objeto con 3 validaciones: nombre, nacimiento y fallecimiento, nombre es un string, minimo 1 caracter, maximo 500 caracteres y es requerido, nacimiento es una fecha, fallecimiento es una fecha o null
const fecha_creacion = Joi.string().min(1).max(200); //valida que sea un string, minimo 1 caracter, maximo 200 caracteres
const tecnica = Joi.array().items(Joi.string()); //valida que sea un array de strings
const dimensiones = Joi.object({
  altura: Joi.number(),
  anchura: Joi.number(),
  unidad: Joi.string(),
}); //valida que sea un objeto con 3 validaciones: altura, anchura y unidad, altura es un numero, anchura es un numero, unidad es un string
const estilo = Joi.string().min(1).max(200); //valida que sea un string, minimo 1 caracter, maximo 200 caracteres
const colecciones = Joi.array().items(Joi.string()); //valida que sea un array de strings
const valoracion = Joi.object({
  criticos: Joi.number().precision(1).min(0).max(5),
  usuarios: Joi.number().precision(1).min(0).max(5),
}); //valida que sea un objeto con 2 validaciones: criticos y usuarios, criticos es un numero, precision de 1, minimo 0, maximo 5, usuarios es un numero, precision de 1, minimo 0, maximo 5

//Crear una pintura
const createPinturaSchema = Joi.object({
  titulo: titulo.required(),
  artista: artista.required(),
  fecha_creacion: fecha_creacion.required(),
  tecnica: tecnica.optional(),
  dimensiones: dimensiones.optional(),
  estilo: estilo.required(),
  colecciones: colecciones.required(),
  valoracion: valoracion.optional(),
});

//Actualizar una pintura
const updatePinturaSchema = Joi.object({
  titulo: titulo.optional(),
  artista: artista.optional(),
  fecha_creacion: fecha_creacion.optional(),
  tecnica: tecnica.optional(),
  dimensiones: dimensiones.optional(),
  estilo: estilo.optional(),
  colecciones: colecciones.optional(),
  valoracion: valoracion.optional(),
});

const getPinturaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPinturaSchema,
  updatePinturaSchema,
  getPinturaSchema,
};
