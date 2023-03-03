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

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo.
   /*  Category.associate = function(models){
        Category.belongsToMany(models.Movie,{
            as: "Category",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id"

        })
    } */

    return Category
};