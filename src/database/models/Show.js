module.exports = (sequelize, dataTypes) => {
    let alias = 'Shows';
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
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        hour: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descriptionHeader:{
            type: dataTypes.STRING 
        },
        descriptionVideo:{
            type: dataTypes.STRING
        },
        video:{
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
        detail: {
            type: dataTypes.VIRTUAL,
            get() {
                const domain = 'http://localhost:3005/';
                const id = this.getDataValue('id');
                return `${domain}api/shows/${id}`;
            }
        },
        imageUrl: {
            type: dataTypes.VIRTUAL,
            get() {
                const imageName = this.getDataValue('image');
                const domain = 'http://localhost:3005/';
                const imgFolder = 'img/Img-Index-Artistas/'
                return `${domain}${imgFolder}${imageName}`;
            }
        }
    };
    let config = {
        timestamps: false,
        tableName: "shows"
        
    }
    const Show = sequelize.define(alias, cols, config); 

    //relacion 1:N tabla show y category
    Show.associate = function(models){
        Show.belongsTo(models.Category,{
            as: "Category",
            foreignKey: "id_category"
        })

        Show.hasMany(models.Orders, {
            as: 'Show',
            foreignKey: 'show_id'
        })
    }

    return Show
};