//librerias externas
const express = require("express");
const morgan = require("morgan"); 
const methodOverride = require('method-override');


//modulos internos
const pinturas = require("./src/routes/pinturas.js"); //importa el archivo pinturas.js
const pinturas_api = require("./src/routes/pinturas_api.js");
const authRouter = require("./src/routes/users.routes.js");




const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";

//mIDDlEWARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false })); 
app.use(express.json());
app.use(methodOverride('_method'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ingenieria informatica', resave: true, saveUninitialized: true }));
require('./src/config/passport')(app);

app.set("views", "./src/views"); //para que ejs sepa donde estan las vistas
app.set("view engine", "ejs"); //para que ejs sepa que motor de plantillas usar

app.use((req,res, next) =>{
  res.locals.user = req.user;
  next();
})

app.use("/api/pinturas", pinturas_api); //para que ejs sepa donde estan las vistas
app.use("/pinturas", pinturas); //para que ejs sepa donde estan las vistas
app.use('/auth', authRouter); 

app.listen(
  PORT,
  () => console.log(`${APP_NAME} is running on http://localhost:${PORT}`) //sirve para ver en que puerto esta corriendo el servidor
);