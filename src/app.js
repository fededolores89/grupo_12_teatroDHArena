const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3005;
const app = express();
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Importamos los distintos enrutadores
const mainRouter = require('./routes/mainRouter')
const showsRouter = require('./routes/showsRouter')
const userRouter = require('./routes/userRouter.js')
const shoppingRouter = require('./routes/shoppingRouter.js')
const apiRouter = require("./routes/api/apiRouter.js")

const authUserVariableMiddleware = require('./middlewares/users/authUserVariableMiddleware.js');
const cookieAuthMiddleware = require('./middlewares/users/cookieAuthMiddleware.js');

app.set("view engine", "ejs");
app.set("views", "./src/views");


// ************ Middlewares - (No tocar) ************
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(cookieParser());
app.use(express.json()); // Para capturar el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(session({secret: 'dhsession'}));
app.use(cookieAuthMiddleware);
app.use(authUserVariableMiddleware);



app.listen(PORT, console.log("Servidor en http://localhost:" + PORT));

// Declararando ubicacion del folder views
app.set("views", path.resolve(__dirname, "views"));


// Usando los enrutadores importados
app.use("/shows", showsRouter); 
app.use("/usuarios", userRouter);
app.use("/", mainRouter);
app.use("/carrito", shoppingRouter);
app.get('/check', (req, res) => {
  if(req.session.authUser == undefined) {
    res.send('No hay un usuario logueado')
  } else {
    res.send(req.session.authUser);
  }
})

//Usando los enrutadores para apis

app.use("/api", apiRouter);






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