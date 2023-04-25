const { fn, col } = require('sequelize');
const db = require('../../database/models');
const sequelize = db.sequelize;

const apiUserController = {
    userList: (req,res) =>{
        let users = db.Users.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'detail']
        })
            .then(users =>{
                let respuesta = {
                    meta:{
                        status:200,
                        total: users.length,
                        url: "api/users"
                    },
                    data: users
                
                
                }
        
                res.json(respuesta)
            })
        },
    detail: (req,res) =>{
        let user = db.Users.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'userType'] }
        })
            .then(user =>{
                let respuesta = {
                    meta:{
                        status:200,
                        url: "api/users" + req.params.id
                    },
                    data: user
                }       
                res.json(respuesta)
            })
        }
}


module.exports = apiUserController;