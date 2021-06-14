require(`colors`)
const config = require('../config.json');
const { nationJSON } = require('../utils/jsonCreator');
const { query } = require('../utils/query');

async function nation(name) {
    const nationData = await query('SELECT * FROM TOWNY_NATIONS WHERE name = ?', [name]);
    const townData = await query('SELECT * FROM TOWNY_TOWNS WHERE nation = ?', [name]);
    var responseCode = 404;
    if (nationData) {
        responseCode = 200;
    }
    var responseJSON = await nationJSON(nationData, townData);

    return {
        responseCode,
        responseJSON
    }
}

async function nations(order, number) {
    if (number > 0) number--;
    var responseCode = 400;
    var responseJSON = [];
    var nations = [];
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
        const nationsData = await query('SELECT * FROM TOWNY_NATIONS ORDER BY ' + order, []);

        if (nationsData.length > number) {
            responseCode = 200;

            for (i = number; i < nationsData.length && i < config.maxSize + number; i++) {
                nations.push(nationsData[i].name)
            }
        } else { error = "Number is out of range" }


    } else { error = "Invalid order !" }
    responseJSON = responseCode == 400 ? { "error": error } : nations
    return {
        responseCode,
        responseJSON
    }
}

module.exports = {
    nation,
    nations
}