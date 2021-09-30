const jwt = require("jsonwebtoken");

generate = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "12h"
        }, (error, token) => {
            if (error) {
                reject("JWT has failed generating token");
            }
            resolve(token);
        });
    });
};

jwtToken = async (uuid) => {
    return await generate({uuid});
};

module.exports = {

    jwtToken
};
