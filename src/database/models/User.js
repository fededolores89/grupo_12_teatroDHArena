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
        },
        detail: {
            type: dataTypes.VIRTUAL,
            get() {
                const domain = 'http://localhost:3005/';
                const id = this.getDataValue('id');
                return `${domain}api/users/${id}`;
            }
        },
        imageUrl: {
            type: dataTypes.VIRTUAL,
            get() {
                const imageName = this.getDataValue('image');
                const domain = 'http://localhost:3005/';
                const imgFolder = 'img/img-users/'
                return `${domain}${imgFolder}${imageName}`;
            }
        },
        fullname: {
            type: dataTypes.VIRTUAL,
            get() {
                const name = this.getDataValue('name');
                const lastname = this.getDataValue('lastname');

                return name + ' ' + lastname;
            }
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

        Users.hasMany(models.Orders, {
            as: 'User',
            foreignKey: 'user_id'
        })
    };

    return Users;
};