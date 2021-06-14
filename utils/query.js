const mysql = require('mysql2/promise');
const dbconfig = require('./dbconfig');

require(`colors`)

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection(dbconfig);
        const [results,] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        return console.log(`[${`DDB ERROR`.red}] ` + error)
    }
}

module.exports = {
    query
}