const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.listen(PORT, console.log('Servidor en http://localhost:' + PORT));

// Declararando ubicacion del folder views
app.set('views', path.resolve(__dirname, 'views'));

/*
 **Estableciendo las rutas de cada vista
 */

// Home
app.get('/', (req, res) => {
  res.sendFile(app.get('views') + '/index.html');
});

// Login
app.get('/login', (req, res) => {
  res.sendFile(app.get('views') + '/login.html');
});

// Register
app.get('/register', (req, res) => {
  res.sendFile(app.get('views') + '/register.html');
});

// ProductCart
app.get('/productCart', (req, res) => {
  res.sendFile(app.get('views') + '/productCart.html');
});

// ProductDetail
app.get('/productDetail/:event', (req, res) => {
  res.sendFile(app.get('views') + '/productDetail.html');
});
