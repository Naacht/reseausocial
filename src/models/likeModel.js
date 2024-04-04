const { sequelize } = require('../helpers/connectionDB');

const Like = sequelize.define('Like', {});

module.exports = { Like };
