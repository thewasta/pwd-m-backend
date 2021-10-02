const cors = require("cors");

exports.cors = function () {
    const allowedHosts = ["http://locahost:8000", "http://localhost:3000"];
    const corsOptions = {
        credentials: true,
        methods: "GET,POST,PUT",
        origin: function (origin, callback) {
            if (!origin || allowedHosts.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Origin not allowed"), false);
            }
        }
    };
    return function (req, res, next) {
        cors(corsOptions)(req, res, next);
    };
};