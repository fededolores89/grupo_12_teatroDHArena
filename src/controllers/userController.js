const fs = require("fs");
const path = require("path");

const controller = {
  /* --------------Muestro la vista del Login----------------- */
  login: (req, res) => {
    res.render("users/login");
  },
  /* --------------Muestro la vista del registro----------------- */
  registro: (req, res) => {
    res.render("users/register");
  },
};

module.exports = controller;
