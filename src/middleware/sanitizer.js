const he = require("he");
exports.sanitizer = (req, res, done) => {
    for (let bodyKey in req.body) {
        req.body[bodyKey] = he.encode(req.body[bodyKey]);
    }
    done();
};