const { DataTypes } = require('sequelize')

/**
 * @param sequelize {import('sequelize').Sequelize}
 */
module.exports = (sequelize) => {
  const Item = sequelize.define(
    'Item',
    {
      name: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'items'
    }
  )

  return Item
}
