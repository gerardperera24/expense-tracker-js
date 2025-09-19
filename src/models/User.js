const { DataTypes } = reuqire('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.BIGINT, autoincrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  displayName: { type: DataTypes.STRING }
}, { tableName: 'users', timestamps: true });

module.exports = User;