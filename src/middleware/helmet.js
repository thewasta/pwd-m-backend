const helmet = require("helmet");

exports.helmet = function () {
    const options = {};
    return function (req, res, next) {
        helmet(options)(req, res, next);
    };
};