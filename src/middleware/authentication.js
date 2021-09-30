const nickNamePattern = /^[a-z0-9_]{3,10}/;
const passwordPattern = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/;
const userRegx = new RegExp(nickNamePattern, "i");
const passwordRegx = new RegExp(passwordPattern, "i");


exports.authentication = {
    login: function (req, res, next) {
        const {nickname, password} = req.body;
        if (!userRegx.test(nickname) || !passwordRegx.test(password)) {
            next({
                "status": "error",
                "code": 15,
                "message": "User or password wrong"
            });
        }
        next();
    },
    register: function (req, res, next) {
        const {nickname, password, confirm_password} = req.body;
        if (!userRegx.test(nickname) && !passwordRegx.test(password)) {
            next({
                "status": "error",
                "code": 15,
                "message": "User and password doesn't match pattern"
            });
        }
        if (!userRegx.test(nickname)) {
            next({
                "status": "error",
                "code": 15,
                "message": "User doesn't match pattern"
            });
        }
        if (!passwordRegx.test(password)) {
            next({
                "status": "error",
                "code": 15,
                "message": "Password doesn't match pattern. Must contain at least one uppercase, one digit, one special character (!@#$%^&*) and length greater than 8"
            });
        }
        if (password !== confirm_password) {
            next({
                "status": "error",
                "code": 15,
                "message": "Password and confirmed password must to be the same"
            });
        }
        next();
    }
};