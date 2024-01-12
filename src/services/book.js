const { Sequelize } = require('sequelize');
const { sequelize } = require('../models/sequelize');
const bookModel = require('../models/book');

//**ok */
exports.saveNewBook = function (data) {
    console.log(data);
    return bookModel.create(data);
};


exports.toread = async function (toread) {
    console.log(`toread: ${toread}`);
    try {
        switch (toread) {
            case 'true':
                const queryText = 'SELECT title, cover, author, previewLink FROM library AS library WHERE library.toread =1;';
                const queryResult = await sequelize.query(queryText, {
                    replacements: { toread },
                    type: Sequelize.QueryTypes.SELECT,
                    raw: true,
                });
                console.log(`toread: ${queryResult}`);
                return queryResult;
            case 'false':
                console.log(`favorites switch 0: ${toread}`);
                break;
        }
    } catch (e) {
        console.log('Error in services', e);
        throw e;
    }
};

exports.readagain = async function (readagain) {
    console.log(`readagain: ${readagain}`);
    try {
        switch (readagain) {
            case 'true':
                const queryText = 'SELECT title, cover, author, previewLink FROM library AS library WHERE library.readagain =1;';
                const queryResult = await sequelize.query(queryText, {
                    replacements: { readagain },
                    type: Sequelize.QueryTypes.SELECT,
                    raw: true,
                });
                console.log(`readagain: ${queryResult}`);
                return queryResult;
            case 'false':
                console.log(`favorites switch 0: ${readagain}`);
                break;
        }
    } catch (e) {
        console.log('Error in services', e);
        throw e;
    }
};

exports.favorites = async function (favorites) {
    console.log(`favorites: ${favorites}`);
    try {
        switch (favorites) {
            case 'true':
                console.log(`favorites switch 1: ${favorites}`);
                const queryText = 'SELECT title, cover, author, previewLink FROM library AS library WHERE library.favorites =1;';
                const queryResult = await sequelize.query(queryText, {
                    replacements: { favorites },
                    type: Sequelize.QueryTypes.SELECT,
                    raw: true,
                });
                console.log(`queryresult: ${queryResult}`);
                return queryResult;
            case 'false':
                console.log(`favorites switch 0: ${favorites}`);
        }
    } catch (e) {
        console.log('Error in services', e);
        throw e;
    }
};

exports.reading = async function (reading) {
    return bookModel.findByPk(reading);
};


