const router = require("express").Router();

const {PasswordRepository} = require("../repositories/PasswordRepositories");
router.post("/save", async function (req, res, next) {
    const passwordRepository = new PasswordRepository();
    try {
        await passwordRepository.store(req.body.uuid, req.body.password, req.body.domain, req.body.title, req.body.note);
        res.json({
            status: "ok",
            message: "Password stored"
        });
    } catch (e) {
        console.log(e);
        next({
            status: "error",
            message: "Something went wrong"
        });
    }
});

router.post("/all", async function (req, res, next) {
    const passwordRepository = new PasswordRepository();

    const result = await passwordRepository.getAll(req.body.user);
    res.json(result);
});

router.post("/view", async function (req, res, next) {
    const passwordRepository = new PasswordRepository();
    const result = await passwordRepository.findOne(req.body.password, req.body.id);
    res.json(result);
});

module.exports = router;