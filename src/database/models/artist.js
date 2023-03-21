module.exports = (sequelize, dataTypes) => {
    let alias = 'Artists';
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
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        video: {
            type: dataTypes.STRING(100),
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
        Artist.hasMany(models.Shows,{
            as: "Artists",
            foreignKey: "id_artist"
        })
    }
 
    return Artist
};