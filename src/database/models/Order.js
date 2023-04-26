module.exports = (sequelize, dataTypes) => {
  let alias = 'Orders';
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    show_id: {
      type: dataTypes.INTEGER
    },
    user_id: {
      type: dataTypes.INTEGER
    }
  }
  let config = {
    tableName: "orders",
    timestamps: false
  }
  const Order = sequelize.define(alias, cols, config);

  Order.associate = models => {
    Order.belongsTo(models.Shows, {
      as: 'Show',
      foreignKey: 'show_id'
    })

    Order.belongsTo(models.Users, {
      as: 'User',
      foreignKey: 'user_id'
    })
  }

  return Order;
}