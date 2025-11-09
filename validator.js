const { body } = require("express-validator");

const validateRegister = [
    body("firstname").trim()
        .isAlpha(),
    body("lastname").trim()
        .isAlpha(),
    body('confirm-password').custom((value, { req }) => {
        return value === req.body.password;
    })
]

const validateLogin = [
    body("username").trim()
        .isAlpha()
]

module.exports = {
    validateRegister,
    validateLogin
}