const fs = require('fs');
const path = require('path')

const controllers = {
    index: (req , res) => {
        res.render('product/allsTheShows')
    },
    detalle: (req , res) => {
        res.render('product/productDetail')
    }
}



module.exports = controllers