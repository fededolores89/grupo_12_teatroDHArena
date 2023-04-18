const db = require('../../database/models');
const sequelize = db.sequelize;

const apiShowController = {
    showList: (req,res) =>{
        let shows = db.Shows.findAll()
            .then(shows =>{
                let respuesta = {
                    meta:{
                        status:200,
                        total: shows.length,
                        url: "api/users"
                    },
                    data: shows
                
                
                }
        
                res.json(respuesta)
            })
        },
    detail: (req,res) =>{
        let show = db.Shows.findByPk(req.params.id)
            .then(show =>{
                let respuesta = {
                    meta:{
                        status:200,
                        url: "api/shows" + req.params.id
                    },
                    data: show
                }       
                res.json(respuesta)
            })
        }
}


module.exports = apiShowController;