const { validatorHandler } = require("../middlewares/validator.handler"); 
const {
    getPinturaSchema,
    createPinturaSchema,
    updatePinturaSchema,
} = require("../schemas/events.schemas.js"); 
const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid');

const { readFile, writeFile, writeFileAccess } = require("../files.js");
const { models } = require("../libs/sequelize"); //importamos el modelo de la base de datos
const FILE_NAME = "./db/pinturas.txt";

//listar pinturas
router.get("/", async (req, res) => {
  //consulta con sequelize
    const pinturas = await models.Pintura.findAll();
    res.send(pinturas);
  });

//crear pinturas
router.post("/", validatorHandler(createPinturaSchema, "body"), async (req, res) => {
    const pintura = await models.Pintura.create(req.body);
    
    res.status(201).send(pintura);
  });

//actualizar pinturas
router.put('/:id',  validatorHandler(updatePinturaSchema,"body" ), async(req, res) =>{

    const { id } = req.params;
    const pintura = await models.Pintura.update(req.body, {
        where: { id: id },
    });

    res.send({'ok': true, pintura: pintura});
})

//eliminar pinturas
router.delete("/:id", validatorHandler(getPinturaSchema, "params"), async (req, res) => {
    const { id } = req.params;
    await models.Pintura.destroy({
      where: { id: id },
    });
    res.send({ ok: true, message: "pintura deleted" });
  });

//obtener una pintura
router.get('/:id', validatorHandler(getPinturaSchema,"params" ), async(req, res) =>{
    const { id } = req.params;
    const pintura = await models.Pintura.findOne({
        where: { id: id },
    });

    res.send(pintura);
})

module.exports = router;
