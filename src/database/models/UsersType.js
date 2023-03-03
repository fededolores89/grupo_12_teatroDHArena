module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersType';
    let cols = {
        id: {
            type: dataTypes.integer,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: dataTypes.STRING(100),
            timestamps: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "usersType"
    }
    const usersType = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo.
}
    return usersType