require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE,
});

exports.sequelize = sequelize;
console.log(`Connecting to database at: ${process.env.DATABASE}`);

exports.connect = async function () {
    try {
        await sequelize.authenticate();
        console.log("Connection to database succeed");
    } catch (e) {
        console.error("Unable to connect to the database");
        console.error(e);
    }
};

//update the database
exports.update = async function () {
    try {
        await sequelize.sync({ force: false });
        console.log("Database Updated");
    } catch (e) {
        console.error("Unable to update the databas");
        console.error(e);
    }
};
