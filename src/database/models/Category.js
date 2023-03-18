module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: dataTypes.STRING(100),
            timestamps: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: "category"
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function(models){
        Category.hasMany(models.Shows,{
            as: "Category",
            foreignKey: "id_category"
        })
    }

    return Category
};