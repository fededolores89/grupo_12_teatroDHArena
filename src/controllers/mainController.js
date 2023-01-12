const fs = require('fs');
const path = require('path')


const controller = {
    index: (req , res) => {
        res.render('main')
    }
}


module.exports = controller;