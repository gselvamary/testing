const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
   
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.USER_ID = !isEmpty(data.USER_ID) ? data.USER_ID : "";
    data.PASSWORD = !isEmpty(data.PASSWORD) ? data.PASSWORD : "";
    // USER_ID checks
    if (Validator.isEmpty(data.USER_ID)) {
        errors.USER_ID = "Registration Number is empty!!";
    }
    // Password checks
    if (Validator.isEmpty(data.PASSWORD)) {
        errors.PASSWORD = "Password is empty!!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

