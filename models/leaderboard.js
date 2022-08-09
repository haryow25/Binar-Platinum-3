'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leaderboard.belongsTo(models.Users, {foreignKey: 'id_leaderboard', as: 'Users'});
    }
  }
  Leaderboard.init({
    id_leaderboard: DataTypes.INTEGER,
    point_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};