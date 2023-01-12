const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE


// Importamos los distintos enrutadores
const mainRouter = require('./routes/mainRouter')
const showsRouter = require('./routes/showsRouter.js')
const userRouter = require('./routes/userRouter.js')


app.set("view engine", "ejs");
app.set("views", "./src/views");


// ************ Middlewares - (No tocar) ************
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(express.json()); // Para capturar el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE



app.listen(PORT, console.log("Servidor en http://localhost:" + PORT));

// Declararando ubicacion del folder views
app.set("views", path.resolve(__dirname, "views"));


// Usando los enrutadores importados
//app.use("/shows", showsRouter);
app.use("/usuarios", userRouter);
app.use("/", mainRouter);




/* 
 // Home
app.get("/", (req, res) => {
  res.sendFile(app.get("views") + "/main/index.html");
});

// Login
app.get("/login", (req, res) => {
  res.sendFile(app.get("views") + "/users/login.html");
});

// Register
app.get("/register", (req, res) => {
  res.sendFile(app.get("views") + "/users/register.html");
});

// ProductCart
app.get("/productCart", (req, res) => {
  res.sendFile(app.get("views") + "/product/productCart.html");
});

// ProductDetail
app.get("/productDetail", (req, res) => {
  res.sendFile(app.get("views") + "/product/productDetail.html");
});
 */