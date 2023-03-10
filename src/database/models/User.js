module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        lastname: {
            type: dataTypes.STRING,
        },
        dni: {
            type: dataTypes.INTEGER,
        },
        birth: {
            type: dataTypes.STRING,
        },
        number: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.INTEGER,
        },
        userType: {
            type: dataTypes.INTEGER,
        }

    };
    let config = {
        timestamps: false,
        tableName: "users"
    }
    const Users = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo.
    Users.associate = models => {
        Users.belongsTo(models.UsersType, {
            foreignKey: 'userType'
        })
    };

    return Users;
};