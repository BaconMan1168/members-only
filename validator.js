const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
    body("firstname").trim()
        .isAlpha(),
    body("lastname").trim()
        .isAlpha()
]

module.exports = {
    validateUser
}