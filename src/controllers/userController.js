const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, "../database/userDataBase.json");
const phonesTypeFilePath = path.join(__dirname, "../database/phonesType.json");
const usersTypeFilePath = path.join(__dirname, "../database/usersType.json");
const documentsTypeFilePath = path.join(__dirname, "../database/documentsType.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const phoneTypes = JSON.parse(fs.readFileSync(phonesTypeFilePath, "utf-8"));
const documentTypes = JSON.parse(fs.readFileSync(documentsTypeFilePath, "utf-8"));
const usersType = JSON.parse(fs.readFileSync(usersTypeFilePath, "utf-8"));
const bcrypt = require('bcryptjs');

const controller = {
  /* --------------Muestro la vista del Login----------------- */
  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    const validations = validationResult(req);
    let authUser = null;
    let errors = [];

    if(validations.isEmpty()) {
      for(let i = 0; i < users.length; i++) {
        if(users[i].email == req.body.email) {
          if(bcrypt.compareSync(req.body.password, users[i].password)) {
            authUser = users[i];
            break;
          }
        }
      }

      if(authUser == null) {
        res.render('users/login', { errors: { invalidAuth: { msg: 'Las credenciales son incorrectas' } }, inputs: req.body});
      } else {
        req.session.authUser = authUser;

        //Validar si se selecciona el checkbox de recordar incio de sesion con cookies
        if(req.body.remember != undefined) {
          res.cookie('remember', authUser.email, { maxAge: 60000});
        }

        res.redirect('/');
      }

    } else {
      const errors = validations.mapped(); //Con mapped el objeto de errores se ordena por tipo de input
      const inputs = req.body;

      res.render('users/login', { errors: errors, inputs: inputs });
    }
  },

  processLogout: (req, res) => {
    req.session.authUser = undefined;
    res.clearCookie('remember'); //Eliminar cualquier cookie de incio de sesion
    res.redirect('/');
  },

  /* --------------Muestro la vista del registro----------------- */
  registro: (req, res) => {
    res.render("users/register", {phoneTypes: phoneTypes, documents: documentTypes});
  },
  create: (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      let user = {
        id: parseInt(users[users.length - 1].id) + 1,
        name: req.body.name,
        lastname: req.body.lastname,
        documentType: parseInt(req.body.documentType),
        documentNum: req.body.documentNum,
        birth: req.body.birth,
        phoneType: parseInt(req.body.phoneType),
        number: req.body.number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        userType: 1,
        image: req.file != undefined ? req.file.filename : "default-profile.jpg"
      }
  
      users.push(user);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
  
      res.redirect('/');
    } else {
      const validations = errors.array();
      const inputs = req.body; //Valores del formulario

      res.render('users/register', {errors: validations, phoneTypes: phoneTypes, documents: documentTypes, inputs: inputs});
    }

  }
};

module.exports = controller;
