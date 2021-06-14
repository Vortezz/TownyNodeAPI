require(`colors`)
const config = require('../config.json');
const { townJSON } = require('../utils/jsonCreator');
const { query } = require('../utils/query');

async function town(name) {
    const townData = await query('SELECT * FROM TOWNY_TOWNS WHERE name = ?', [name]);
    const outsidersData = await query('SELECT * FROM TOWNY_RESIDENTS WHERE town = ?', [name]);
    var responseCode = 404;
    if (townData) {
        responseCode = 200;
    }
    var responseJSON = await townJSON(townData, outsidersData);

    return {
        responseCode,
        responseJSON
    }
}

async function towns(order, number) {
    if (number > 0) number--;
    var responseCode = 400;
    var responseJSON = [];
    var towns = [];
    var error;
    if (order == "name-desc" || order == "name" || order == "time-desc" || order == "time") {
        switch (order) {
            case "name-desc":
                order = "name DESC"
                break;
            case "time":
                order = "registered"
                break;
            case "time-desc":
                order = "registered DESC"
                break;
        }
        const townsData = await query('SELECT * FROM TOWNY_TOWNS ORDER BY ' + order, []);

        if (townsData.length > number) {
            responseCode = 200;

            for (i = number; i < townsData.length && i < config.maxSize + number; i++) {
                towns.push(townsData[i].name)
            }
        } else { error = "Number is out of range" }


    } else { error = "Invalid order !" }
    responseJSON = responseCode == 400 ? { "error": error } : towns
    return {
        responseCode,
        responseJSON
    }
}

module.exports = {
    town,
    towns
}
