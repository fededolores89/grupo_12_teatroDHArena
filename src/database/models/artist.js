module.exports = (sequelize, dataTypes) => {
    let alias = 'Artist';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Image: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "artist"
        
    }
    const Artist = sequelize.define(alias, cols, config); 

    //relacion 1:N tabla artists

    Artist.associate = function(models){
        Artist.hasMany(models.Show,{
            as: "Show",
            foreignKey: "id_artist"
        })
    }
 
    return Artist
};