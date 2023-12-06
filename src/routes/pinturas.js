const { validatorHandler } = require("../middlewares/validator.handler"); //importa el middleware de validacion
const {
  getPinturaSchema,
  createPinturaSchema,
  updatePinturaSchema,
} = require("../schemas/events.schemas.js"); //importa los schemas de validacion


const express = require("express");
const router = express.Router();
const { models } = require("../libs/sequelize"); //importamos el modelo de la base de datos
const multer = require('multer');
const path = require('path'); 


//mIDDlEWARE
router.use(express.urlencoded({ extend: false })); 
router.use(express.json());

//importa rle controlador de eventos
const service = require('../services/pinturas.service.js');

// Configura multer para gestionar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '..', 'images');
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

//ruta para mostrar la vista de carrito
router.get("/carrito", async (req, res) => {
  const carrito = await service.getCarrito();
  res.render("pinturas/carrito", { carrito: carrito });
});


router.post("/agregar-al-carrito/:id", async (req, res) => {
  const pinturaId = req.params.id;
  await service.agregarCarrito(pinturaId);
  res.redirect("/pinturas/carrito");
});

//ruta para eliminar una pintura del carrito
router.post("/eliminar-del-carrito/:id", async (req, res) => {
  const pinturaId = req.params.id;
  await service.eliminarCarrito(pinturaId);
  res.redirect("/pinturas/carrito");
}); 

// Ruta para procesar el formulario de pedido
router.post("/realizar-pedido", async (req, res) => {
  const { documento, nombre, apellidos, direccion, telefono, pinturas } = req.body;
  
  // Crea la orden en la base de datos
  const orden = await service.crearOrden({ documento, nombre, apellidos, direccion, telefono, pinturas });

  // Elimina el carrito
  await service.limpiarCarrito();
  
  res.redirect("/pinturas?mensaje=pedido-realizado");
});

//middleware para autenticar
router.use((req, res, next) => {
  if(req.user || req.path === '/principal') {
    res.locals.user = req.user;
    next();
  } else {
    res.redirect('/pinturas/principal')
  }
});



  router.get("/principal", async(req, res) => {
    const pinturas = await service.getPinturas();
  const {search} = req.query;
  if(search){
    pinturas = pinturas.filter(pintura => pintura.titulo.toLowerCase().includes(search.toLowerCase()))
  }
  res.render("pinturas/principal", { pinturas: pinturas, search: search }); 
  });
  


//Definimos las rutas
//Listar pinturas
router.get("/", async(req, res) => {
  const pinturas = await service.getPinturas();
  const {search} = req.query;
  if(search){
    pinturas = pinturas.filter(pintura => pintura.titulo.toLowerCase().includes(search.toLowerCase()))
  }
  res.render("pinturas/index", { pinturas: pinturas, search: search }); 
});

//ruta para mostrar la vista de crear pintura
router.get("/create", (req, res) => {
  res.render("pinturas/create");
});

//ruta para crear una pintura con service y sequelize
router.post("/", upload.single('imagen'), validatorHandler(createPinturaSchema, "body"), async (req, res) => {
  try {
      const newPintura = req.body;

      // Agrega la ruta de la imagen al objeto de la pintura
      // newPintura.imagen = req.file.filename;

      // Guarda la pintura en la base de datos
      const pintura = await service.store(newPintura);

      res.redirect("/pinturas?mensaje=creado");
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al crear la pintura" });
  }
});

//ruta para mostrar la vista de actualizar pintura
router.get("/update/:id", validatorHandler(getPinturaSchema, "params"), async(req, res) => {
  const pintura = await service.update(req.params.id);
  res.render("pinturas/update", { pintura: pintura });
});

//ruta para eliminar una pintura
router.post("/delete/:id", validatorHandler(getPinturaSchema, "params"), async(req, res) => {
  const pintura = await service.destroy(req.params.id);
  res.redirect("/pinturas?mensaje=eliminado");
});







  // //Eliminar una pintura
  // router.post("/delete/:id", (req, res) => {
  //   //:id porque es un parametro
  //   // console.log(req.params.id);
  //   // //Guardamos el id que viene en la url
  //   // const id = req.params.id;
  //   // //leer el archivo de pinturas
  //   // const pinturas = readFile(FILE_NAME);
  //   // //buscar la pintura con el id que recibimos
  //   // const pinturaIndex = pinturas.findIndex((pintura) => pintura.id === id);
  //   // if (pinturaIndex < 0) {
  //   //   res.status(404).json({ ok: false, message: "pintura not found" });
  //   //   return;
  //   // }
  //   // //Eliminar la pintura que esté en la posicion pinturaIndex
  //   // pinturas.splice(pinturaIndex, 1);
  //   // writeFile(FILE_NAME, pinturas);

  //   //consulta con sequelize
  //   models.Pintura.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   });

  //   res.redirect("/pinturas?mensaje=eliminado");
  // });
  
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
