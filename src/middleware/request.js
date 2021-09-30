exports.sanitizer = (req, res, done) => {
    // for (let bodyKey in req.body) {
    //     req.body[bodyKey] = he.encode(req.body[bodyKey]);
    // }
    done();
};

exports.request = (req, res, next) => {
    if (req.method === "POST") {
        if (Object.keys(req.body).length === 0) {
            res.statusCode = 400;
            res.json({status: "error", code: 0, message: "Body is required"});
            return;
        }
    }
    // console.log(req);
    // console.log(req._remoteAddress);
    // console.log(req._startTime);
    // console.log(req.method);
    // console.log(req.ip);
    // console.log(req.statusCode);
    next();
};
