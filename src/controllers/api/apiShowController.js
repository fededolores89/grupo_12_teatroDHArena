const db = require('../../database/models');
const sequelize = db.sequelize;

const apiShowController = {
    showList: (req,res) =>{
        let shows = db.Shows.findAll()
            .then(shows =>{
                let respuesta = {
                    meta:{
                        status:200,   
                        url: "api/shows"
                    },
                    data: shows
                }      
                res.json(respuesta)
            })
        },
    showCount:(req,res) =>{
        let shows = db.Shows.findAll()
            .then(shows =>{
                let respuesta = {
                    meta:{
                        status:200,
                    },
                    data: shows.length,
                }      
                res.json(respuesta)
            })
        },    
    showCountByCategory: (req,res) =>{
        db.Shows.count({
            attributes: ["id_category", "Category.name"],
            group: "id_category",
            include: "Category"
        })
            .then(data =>{
                res.json(data)
            })
        },      
        /* db.Shows.findAll({ 
            attributes: [
                "Category",
                [sequelize.fn("COUNT", sequelize.col("id_category"), "count_category")]
            ],
            group: "id_category"
        })
            .then(data => {
                res.json(data)
            })
        }, */
    
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