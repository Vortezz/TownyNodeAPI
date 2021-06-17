const config = require('../config.json')

const dbconfig = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.name,
};


module.exports = dbconfig;