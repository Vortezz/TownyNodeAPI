require(`colors`)
const config = require('../config.json');
const { residentJSON } = require('../utils/jsonCreator');
const { query } = require('../utils/query');

async function resident(name) {
    const residentData = await query('SELECT * FROM TOWNY_RESIDENTS WHERE name = ?', [name]);
    var responseCode = 404;
    if (residentData) {
        responseCode = 200;
    }
    var responseJSON = await residentJSON(residentData);

    return {
        responseCode,
        responseJSON
    }
}

async function residents(order, number) {
    if (number > 0) number--;
    var responseCode = 400;
    var responseJSON = [];
    var residents = [];
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
        const residentsData = await query('SELECT * FROM TOWNY_RESIDENTS ORDER BY ' + order, []);

        if (residentsData.length > number) {
            responseCode = 200;

            for (i = number; i < residentsData.length && i < config.maxSize + number; i++) {
                residents.push(residentsData[i].name)
            }
        } else { error = "Number is out of range" }


    } else { error = "Invalid order !" }
    responseJSON = responseCode == 400 ? { "error": error } : residents
    return {
        responseCode,
        responseJSON
    }
}

module.exports = {
    resident,
    residents
}