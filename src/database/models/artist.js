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
        Image: {
            type: dataTypes.Image,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "artist"
        
    }
    const Artist = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
 
    return Artist
};