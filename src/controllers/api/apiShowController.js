const db = require('../../database/models');
const sequelize = db.sequelize;

const apiShowController = {
    showList: (req,res) =>{
        let shows = db.Shows.findAll({
            attributes: ["id", "name", "descriptionHeader"], 
            include: [{association: "Category"}] 
        })
            .then(shows =>{
                let respuestaShow = shows;
                respuestaShow.detail = 2;
                let respuesta = {
                    meta:{
                        status:200,   
                        url: "api/shows"
                    },
                    data: respuestaShow
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
    detail: (req,res) =>{
        let show = db.Shows.findByPk(req.params.id, {
            include: [{association: "Category"}] 
        })
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
        },
    lastShow: (req,res) =>{
        let shows = db.Shows.findAll({
            order: [["id","DESC"], ],
            limit : 1 
        })
        .then(shows =>{
            let respuesta = {
                meta:{
                    status:200,
                },
                data: shows,
            }      
            res.json(respuesta)
        })
        
    },
    image: (req , res) => {
        db.Shows.findAll()
        .then(data => {
           console.log(data.image)
            res.render("product/imageShow", { shows: data })
        })
    }
}


module.exports = apiShowController;