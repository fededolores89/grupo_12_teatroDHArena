const fs = require('fs');
const path = require('path')

const controllers = {
    index: (req , res) => {
        res.render('product/allsTheShows')
    },
    detalle: (req , res) => {
        res.render('product/productDetail')
    },
    edit: (req , res) => {
        res.render('product/productCart')
}
}


module.exports = controllers