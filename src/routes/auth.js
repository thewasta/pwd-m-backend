const router = require("express").Router();
const {UserRepository} = require("../repositories/UserRepository");
const {authentication} = require("../middleware/authentication");

router.post("/login",
    authentication.login,
    async (req, res, next) => {
        const userRepository = new UserRepository();
        console.log(req.body.nickname, req.body.password);
        const user = await userRepository.findUserByNickname(req.body.nickname, req.body.password);
        if (user === "server down") {
            res.statusCode = 500;
            res.json({
                "status": "error",
                "message": "Server isn't responding to request, please again in a 2 minutes"
            });
            return;
        }
        if (user) {
            res.json({
                "status": "ok",
                "message": "You are in",
                user: {
                    nick: user.nickname,
                    uuid: user.uuid
                }
            });
            return;
        }
        res.statusCode = 401;
        res.json({
            "status": "error",
            "message": "Wrong password or user"
        });
    });

router.post("/register",
    authentication.register,
    async (req, res, next) => {

        const userRepository = new UserRepository();
        try {
            await userRepository.createUser(req.body.nickname, req.body.password);
            res.send("pass middleware");
        } catch (e) {
            next(e);
        }
    },
    function (err, req, res, next) {
        if (err) {
            res.statusCode = 401;
            res.json({
                "status": "error",
                "code": 15,
                "message": err
            });
        }
    });

router.all("/register|login", (req, res) => {
    res.statusCode = 404;
    res.json({
        "status": "error",
        "message": "Method not allowed"
    });
});


router.all("*", (req, res) => {
    res.statusCode = 404;
    res.json({
        "status": "error",
        "message": "Path not found"
    });
});

module.exports = router;

