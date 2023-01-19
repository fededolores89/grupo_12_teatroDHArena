const fs = require('fs');
const path = require('path')
const showsFilePath = path.join(__dirname, '../database/showsDataBase.json');
const shows = JSON.parse(fs.readFileSync(showsFilePath, 'utf-8'));

const controllers = {
    index: (req , res) => {
        res.render('product/allsTheShows')
    },
    detalle: (req , res) => {
        let id = req.params.id
        const shows = JSON.parse(fs.readFileSync(showsFilePath, 'utf-8'));
        
        let showsFiltrado = shows.find(show => {
            return show.id == id
        })
        
        
       
        res.render('product/productDetail' , {"shows": showsFiltrado})
    },
    edit: (req , res) => {
        let id = req.params.id
        const shows = JSON.parse(fs.readFileSync(showsFilePath, 'utf-8'));
        
        let showsFiltrado = shows.find(show => {
            return show.id == id
        })
        
        
       
        res.render('product/editShows' , {"shows": showsFiltrado})
}
}


module.exports = controllers