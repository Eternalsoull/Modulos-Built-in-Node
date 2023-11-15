const { validatorHandler } = require("../middlewares/validator.handler"); //importa el middleware de validacion
const {
  getPinturaSchema,
  createPinturaSchema,
  updatePinturaSchema,
} = require("../schemas/events.schemas.js"); //importa los schemas de validacion


const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); //importamos el modulo de node para generar ids unicos
const { models } = require("../libs/sequelize"); //importamos el modelo de la base de datos
const fs = require("fs"); 
const moment = require('moment');
const Swal = require('sweetalert2')

//modulos internos
const { readFile, writeFile, writeFileAccess } = require("../files.js");
const FILE_NAME = "./db/pinturas.txt";
const FILE_NAME_ACCESS = "./db/acces.json"; 

//mIDDlEWARE
router.use(express.urlencoded({ extend: false }));
router.use(express.json());


//WEB
    //Listar pinturas
router.get("/", async(req, res) => {
    // let pinturas = readFile(FILE_NAME);
    const {search} = req.query;
      // if(search){
      //   pinturas = pinturas.filter(pintura => pintura.titulo.toLowerCase().includes(search.toLowerCase()))
      // }
    
    //crear el archivo acces.json
    // if (!fs.existsSync(FILE_NAME_ACCESS)) {
    //   writeFileAccess(FILE_NAME_ACCESS, '[]');
    // }
  
      // const acces = readFile(FILE_NAME_ACCESS); 
      // const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      // const method = req.method;
      
      // acces.push([currentTime, method, "Listar pinturas", req.url]);
      // const accesJson = JSON.stringify(acces);
      
      // writeFileAccess(FILE_NAME_ACCESS, accesJson); 

      //consulta con sequelize
      let pinturas = await models.Pintura.findAll();
  
    res.render("pinturas/index", { pinturas: pinturas, search: search });
  });

//Crear pinturas
router.get("/create", (req, res) => {

  res.render("pinturas/create");
});
  //crear pinturas
router.post("/", validatorHandler(createPinturaSchema, "body"), async (req, res) => {
  try {
    // const data = readFile(FILE_NAME);
    // const newPintura = req.body;

    // newPintura.id = uuidv4();
    // console.log(newPintura);
    // console.log(data);
    // data.push(newPintura);

    // writeFile(FILE_NAME, data);
    // res.json({ message: "La pintura fue creada con exito" });

    //consulta con sequelize
    const newPintura = await models.Pintura.create(req.body);
    res.redirect("/pinturas");
  } catch (err) {
    console.error(err);
    res.json({ message: "Error al crear la pintura" });
  }
}
);
  //Eliminar una pintura
  router.post("/delete/:id", (req, res) => {
    //:id porque es un parametro
    // console.log(req.params.id);
    // //Guardamos el id que viene en la url
    // const id = req.params.id;
    // //leer el archivo de pinturas
    // const pinturas = readFile(FILE_NAME);
    // //buscar la pintura con el id que recibimos
    // const pinturaIndex = pinturas.findIndex((pintura) => pintura.id === id);
    // if (pinturaIndex < 0) {
    //   res.status(404).json({ ok: false, message: "pintura not found" });
    //   return;
    // }
    // //Eliminar la pintura que esté en la posicion pinturaIndex
    // pinturas.splice(pinturaIndex, 1);
    // writeFile(FILE_NAME, pinturas);

    //consulta con sequelize
    models.Pintura.destroy({
      where: {
        id: req.params.id
      }
    });

    res.redirect("/pinturas?mensaje=eliminado");
  });
  
  //Actualizar una pintura
  router.get("/update/:id", validatorHandler(updatePinturaSchema, "body"), (req, res) => {
    // const id = req.params.id;
    // const pinturas = readFile(FILE_NAME);
    // const pinturaFound = pinturas.find((pintura) => pintura.id === id);
  
    // if (!pinturaFound) {
    //   res.status(404).json({ ok: false, message: "pintura not found" });
    //   return;
    // }

    //consulta con sequelize
    models.Pintura.findByPk(req.params.id)
      .then(pintura => {
        res.render("pinturas/update", { pintura: pintura });
      })
      .catch(err => {
        console.error(err);
        res.json({ message: "Error al obtener la pintura" });
      });

  });
  
  router.post("/update/:id", (req, res) => {
    // //:id porque es un parametro
    // console.log(req.params.id);
    // //Guardamos el id que viene en la url
    // const id = req.params.id;
    // //leer el archivo de pinturas
    // const pinturas = readFile(FILE_NAME);
    // //buscar la pintura con el id que recibimos
    // const pinturaFound = pinturas.find((pintura) => pintura.id === id); //
    // if (!pinturaFound) {
    //   res.status(404).json({ ok: false, message: "pintura not found" });
    //   return;
    // }
    // //actualizar la pintura
    // pinturaFound.titulo = req.body.titulo;
    // pinturaFound.nombre = req.body.nombre;
    // pinturaFound.nacimiento = req.body.nacimiento;
    // pinturaFound.fallecimiento = req.body.fallecimiento;
    // pinturaFound.fecha_inicio = req.body.fecha_inicio;
    // pinturaFound.fecha_fin = req.body.fecha_fin;
    // pinturaFound.tecnica = req.body.tecnica;
    // pinturaFound.altura = req.body.altura;
    // pinturaFound.anchura = req.body.anchura;
    // pinturaFound.unidad = req.body.unidad;
    // pinturaFound.estilo = req.body.estilo;
    // pinturaFound.colecciones = req.body.colecciones;
    // pinturaFound.valoracion_criticos = req.body.valoracion_criticos;
    // pinturaFound.valoracion_usuarios = req.body.valoracion_usuarios;
    // //guardar el archivo
    // writeFile(FILE_NAME, pinturas);

    //consulta con sequelize
    models.Pintura.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    //Enviar la pintura encontrada a la vista
    res.redirect("/pinturas?mensaje=actualizado");
    
  });

module.exports = router;
