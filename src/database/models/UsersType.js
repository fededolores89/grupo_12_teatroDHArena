module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersType';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        timestamps: false,
        tableName: "userstype"
    }

    const UsersType = sequelize.define(alias, cols, config);

    UsersType.associate = models => {
        UsersType.hasMany(models.Users, {
            foreignKey: 'userType'
        });
    };

    return UsersType;
}