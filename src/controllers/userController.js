const fs = require('fs');
const path = require('path')


const controller = {
    login: (req , res) =>{
        res.render('users/login')
    },
    registro: (req , res) =>{
        res.render('users/register')
    },
}






module.exports = controller;