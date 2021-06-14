const env = process.env;

const dbconfig = {
    host: env.HOST,
    user: env.USER,
    password: env.PASS,
    database: env.NAME,
};


module.exports = dbconfig;