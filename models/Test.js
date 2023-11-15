module.exports = function (sequelize, DataTypes) {
  const test = sequelize.define(
    "test",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "NULL",
      },
    },
    {
      tableName: "test",
      timestamps: true,
    }
  );
  return test;
};
