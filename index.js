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

//modulos internos
const { readFile, writeFile } = require("./src/files.js"); //

const app = express();
const FILE_NAME = "./db/pinturas.txt";

//mIDDlEWARE
app.use(express.urlencoded({ extend: false })); 
app.use(express.json());

app.get("/read-file", (req, res) => {
  const data = readFile(FILE_NAME);
  res.send(data);
});

//listar pinturas
app.get("/pinturas", async (req, res) => {
  const data = readFile(FILE_NAME);
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

app.listen(3000, () =>
  console.log(`Server is running on http://localhost:3000`)
);
