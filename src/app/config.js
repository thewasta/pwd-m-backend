require("dotenv").config();


const {
    SERVER_PORT,
    ELASTIC_HOST,
    ELASTIC_PORT,
    APP_DOMAIN,
    APP_ENV,
    BCRYPT_SALT,
    SECRET_CRYPTO

} = process.env;

module.exports = {
    port: SERVER_PORT,
    elastic_host: ELASTIC_HOST,
    elastic_port: ELASTIC_PORT,
    domain: APP_DOMAIN,
    env: APP_ENV,
    salt: Number(BCRYPT_SALT),
    secret: SECRET_CRYPTO
};