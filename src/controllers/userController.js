const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../database/userDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controller = {
  /* --------------Muestro la vista del Login----------------- */
  login: (req, res) => {
    res.render("users/login");
  },
  /* --------------Muestro la vista del registro----------------- */
  registro: (req, res) => {
    res.render("users/register");
  },
  create: (req, res) => {
    let user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      lastname: req.body.lastname,
      documentType: parseInt(req.body.documentType),
      documentNum: req.body.documentNum,
      birth: req.body.birth,
      phoneType: parseInt(req.body.phoneType),
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
      userType: parseInt(req.body.userType),
      image: req.file ? req.file.filename : "default-image.png"
    }

    res.send(user);
  }
};

module.exports = controller;
