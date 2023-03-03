module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        lastname: {
            type: dataTypes.STRING(100),
            timestamps: false
        },
        DNI: {
            type: dataTypes.INTEGER,
            timestamps: false
        },
        birth: {
            type: dataTypes.STRING(20),
            timestamps: false
        },
        number: {
            type: dataTypes.INTEGER,
            timestamps: false
        },
        email: {
            type: dataTypes.STRING(20),
            timestamps: false
        },
        password: {
            type: dataTypes.STRING(20),
            timestamps: false
        },
        Image: {
            type: dataTypes.INTEGER,
            timestamps: false
        },
        userTypeID: {
            type: dataTypes.INTEGER,
            timestamps: false
        }

    };
    let config = {
        timestamps: false,
        tableName: "users"
    }
    const Users = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo.

    return Users
};