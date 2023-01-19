const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../database/showsDataBase.json');
const shows = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const controller = {
    
   
    index: (req , res) => {
        
        const shows = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
      

       
        res.render('main' , {"shows": shows})
        

    }
}


module.exports = controller;