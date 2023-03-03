module.exports = (sequelize, dataTypes) => {
    let alias = 'Shows';
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
            type: dataTypes.VARCHAR,
            allowNull: false
        },
        date: {
            type: dataTypes.date,
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
    const Shows = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
 
    return Shows
};