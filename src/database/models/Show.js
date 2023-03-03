module.exports = (sequelize, dataTypes) => {
    let alias = 'Show';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        hour: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        id_artist: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "shows"
        
    }
    const Show = sequelize.define(alias, cols, config); 

    //relacion 1:N tabla artists
    Show.associate = function(models){
        Show.belongsTo(models.Artist,{
            as: "Artist",
            foreignKey: "id_artist"
        })
    }
    return Show
};