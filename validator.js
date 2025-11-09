const { body } = require("express-validator");
const db = require ('./models/queries')

const validateRegister = [
    body("firstname").trim()
        .isAlpha(),
    body("lastname").trim()
        .isAlpha(),
    body("username").custom(async value => {
        const user = await db.findUserByName(value);

        if (user) {
            throw new Error('Username already in use');
        }
    }),
    body("password").trim()
        .notEmpty(),
    body("confirm-password").custom((value, { req }) => {
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