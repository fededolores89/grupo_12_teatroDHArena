module.exports = (sequelize, dataTypes) => {
    let alias = 'Shows';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        hour: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.STRING,
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descriptionHeader:{
            type :dataTypes.STRING 
        },
        descriptionVideo:{
            type: dataTypes.STRING
        },
        video:{
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
    };
    let config = {
        timestamps: false,
        tableName: "shows"
        
    }
    const Show = sequelize.define(alias, cols, config); 

    //relacion 1:N tabla artists y category
    Show.associate = function(models){
        Show.belongsTo(models.Artists,{
            as: "Artist",
            foreignKey: "id_artist"
        })
        Show.belongsTo(models.Category,{
            as: "Category",
            foreignKey: "id_category"
        })
    }

    return Show
};