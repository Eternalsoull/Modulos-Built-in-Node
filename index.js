const { validatorHandler } = require("./src/middlewares/validator.handler"); //importa el middleware de validacion
const {
  getPinturaSchema,
  createPinturaSchema,
  updatePinturaSchema,
} = require("./src/schemas/events.schemas"); //importa los schemas de validacion

//librerias externas
const express = require("express");
const fs = require("fs"); 
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan"); 
const moment = require('moment');



//modulos internos
const { readFile, writeFile } = require("./src/files.js"); //

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";
const FILE_NAME = "./db/pinturas.txt";
const FILE_NAME_ACCESS = "./db/acces.json"; 


//mIDDlEWARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false })); 
app.use(express.json());

app.set("views", "./src/views"); //para que ejs sepa donde estan las vistas
app.set("view engine", "ejs"); //para que ejs sepa que motor de plantillas usar

app.get("/read-file", (req, res) => {
  const data = readFile(FILE_NAME);
  res.send(data);
});
//WEB
//Listar pinturas
app.get("/pinturas", (req, res) => {
  const data = readFile(FILE_NAME);
  //crear el archivo acces.json
  if (!fs.existsSync(FILE_NAME_ACCESS)) {
    writeFile(FILE_NAME_ACCESS, '[]');
  }

    const acces = readFile(FILE_NAME_ACCESS); 
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const method = req.method;
    
    acces.push(currentTime);
    acces.push(method);
    acces.push("Listar pinturas");
    acces.push(req.url);
    const accesJson = JSON.stringify(acces);
    
    writeFile(FILE_NAME_ACCESS, accesJson); 

  //filtrar por estilo
  if (req.query && req.query.estilo) {
    const estilo = req.query.estilo;
    const pinturas = data.filter((pintura) => pintura.estilo === estilo);
    res.render("pinturas/index", { pinturas: pinturas });
    return;
  }

  res.render("pinturas/index", { pinturas: data });
});


//Crear pinturas
app.get("/pinturas/create", (req, res) => {
  //mostar el formulario para crear pinturas
  res.render("pinturas/create");
});

//Eliminar una pintura
app.post("/pinturas/delete/:id", (req, res) => {
  
  const acces = readFile(FILE_NAME_ACCESS); 
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const method = req.method;
  
  acces.push(currentTime);
  acces.push(method);
  acces.push("Eliminar pintura");
  acces.push(req.url);
  const accesJson = JSON.stringify(acces);
  
  writeFile(FILE_NAME_ACCESS, accesJson); 
  //:id porque es un parametro
  console.log(req.params.id);
  //Guardamos el id que viene en la url
  const id = req.params.id;
  //leer el archivo de pinturas
  const pinturas = readFile(FILE_NAME);
  //buscar la pintura con el id que recibimos
  const pinturaIndex = pinturas.findIndex((pintura) => pintura.id === id);
  if (pinturaIndex < 0) {
    res.status(404).json({ ok: false, message: "pintura not found" });
    return;
  }
  //Eliminar la pintura que esté en la posicion pinturaIndex
  pinturas.splice(pinturaIndex, 1);
  writeFile(FILE_NAME, pinturas);
  res.redirect("/pinturas");
});




//listar pinturas
app.get("/api/pinturas", async (req, res) => {
  const data = readFile(FILE_NAME);
//filtrar por estilo, si no se encuentra el estilo, se muestra todo
  if (req.query && req.query.estilo) {
    const estilo = req.query.estilo;
    const pinturas = data.filter((pintura) => pintura.estilo === estilo);
    res.send(pinturas);
    return;
  }

  res.send(data);
});
//crear pinturas

app.post("/pinturas", validatorHandler(createPinturaSchema, "body"), async (req, res) => {
    try {
      const data = readFile(FILE_NAME);
      const newPintura = req.body;

      newPintura.id = uuidv4();
      console.log(newPintura);
      console.log(data);
      data.push(newPintura);

      writeFile(FILE_NAME, data);
      res.json({ message: "La pintura fue creada con exito" });
    } catch (err) {
      console.error(err);
      res.json({ message: "Error al crear la pintura" });
    }
  }
);

//obtener una sola pintura por id
app.get("/pinturas/:id", validatorHandler(getPinturaSchema, "params"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const pinturas = readFile(FILE_NAME);
    const pinturaFound = pinturas.find((pintura) => pintura.id === id);
    if (!pinturaFound) {
      res.status(404).json({ ok: false, message: "pintura not found" });
      return;
    }
    res.send({ ok: true, pintura: pinturaFound });
  }
);

//actualizar una pintura
app.put("/pinturas/:id", validatorHandler(updatePinturaSchema, "body"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const pinturas = readFile(FILE_NAME);
    const pinturaIndex = pinturas.findIndex((pintura) => pintura.id === id);
    if (pinturaIndex < 0) {
      res.status(404).json({ ok: false, message: "pintura not found" });
      return;
    }
    let pintura = pinturas[pinturaIndex];
    pintura = { ...pintura, ...req.body };
    pinturas[pinturaIndex] = pintura;
    writeFile(FILE_NAME, pinturas);

    res.send({ ok: true, pintura: pintura });
  }
);

//Eliminar una pintura
app.delete("/pinturas/:id", validatorHandler(getPinturaSchema, "params"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const pinturas = readFile(FILE_NAME);
    const pinturaIndex = pinturas.findIndex((pintura) => pintura.id === id);
    if (pinturaIndex < 0) {
      res.status(404).json({ ok: false, message: "pintura not found" });
      return;
    }
    pinturas.splice(pinturaIndex, 1);
    writeFile(FILE_NAME, pinturas);
    res.send({ ok: true, pintura: true });
  }
);

app.listen(
  PORT,
  () => console.log(`${APP_NAME} is running on http://localhost:${PORT}`) //sirve para ver en que puerto esta corriendo el servidor
);