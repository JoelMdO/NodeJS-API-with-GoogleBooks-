const { connect, update } = require('./sequelize');

exports.initDatabase = async function () {
    await connect();
    await update();
    ;
}