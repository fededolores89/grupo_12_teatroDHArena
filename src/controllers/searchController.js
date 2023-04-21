const db = require('../database/models');
const sequelize = db.sequelize;

const op = db.Sequelize.Op

const controllers = {
    search: (req,res) =>{
        
        db.Shows.findAll({
            where:{
                name:  {[op.like]: "%" + req.query.search + "%"} 
            }
        })
            .then(shows => {
                res.render("product/searchShows", { shows: shows})
                
            })
    }
}

module.exports = controllers;




