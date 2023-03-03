module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersType';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
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

    const UsersType = sequelize.define(alias, cols, config); 

    return UsersType
}