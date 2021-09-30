exports.errorRequest = function (err, req, res) {
    const status = "error";
    res.statusCode = err.statusCode;
    res.json({
        status,
        code: err.code | 404,
        message: err.message | "Route not allowed"
    });
};
