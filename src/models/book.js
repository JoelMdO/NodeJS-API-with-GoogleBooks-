const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define('library', {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selfLink: {
        type: DataTypes.STRING,
    },
    previewLink: {
        type: DataTypes.STRING,
    },
    toread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    readagain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    favorites: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    reading: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'library',
    timestamps: false,
});