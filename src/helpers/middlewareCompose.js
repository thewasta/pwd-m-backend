const {middlewares} = require("../middleware/middleware");

module.exports = function () {
    return function (request, response, done) {
        (function iterate(i, max) {
            if (i === max) {
                return done();
            }
            middlewares[i](request, response, iterate.bind(this, i + 1, max));
        })(0, middlewares.length);
    };
};
