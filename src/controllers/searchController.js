const db = require('../database/models');
const sequelize = db.sequelize;

const controllers = {
    search: (req,res) =>{
        res.send("Search")
    }

}

module.exports = controllers;