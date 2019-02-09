const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.USER_ID = !isEmpty(data.USER_ID) ? data.USER_ID : "";
    data.FIRST_NAME = !isEmpty(data.FIRST_NAME) ? data.FIRST_NAME : "";
    data.LAST_NAME = !isEmpty(data.LAST_NAME) ? data.LAST_NAME : "";
    data.MAIL_ID = !isEmpty(data.MAIL_ID) ? data.MAIL_ID : "";
    data.MOBILE = !isEmpty(data.MOBILE) ? data.MOBILE : "";
    data.ROLE = !isEmpty(data.ROLE) ? data.ROLE : "";
    data.PASSWORD = !isEmpty(data.PASSWORD) ? data.PASSWORD : "";
    data.PASSWORD1 = !isEmpty(data.PASSWORD1) ? data.PASSWORD1 : "";
    data.DOB = !isEmpty(data.DOB) ? data.DOB : "";
    data.DEPT = !isEmpty(data.DEPT) ? data.DEPT : "";

    // Name checks
    if (Validator.isEmpty(data.USER_ID)) {
        errors.USER_ID = "Registration Number is empty!!";
    }
    if (Validator.isEmpty(data.FIRST_NAME)) {
        errors.FIRST_NAME = "First Name is empty!!";
    }

    if (Validator.isEmpty(data.LAST_NAME)) {
        errors.LAST_NAME = "Last Name is empty!!";
    }
    if (Validator.isEmpty(data.PASSWORD)) {
        errors.PASSWORD = "Password is empty!!";
    }
    if (Validator.isEmpty(data.PASSWORD1)) {
        errors.PASSWORD1 = "Password is empty!!";
    }
    if (!Validator.isLength(data.PASSWORD, { min: 8, max: 30 })) {
        errors.PASSWORD = "Password must be at least 8 characters";
    }
    if (!Validator.equals(data.PASSWORD, data.PASSWORD1)) {
        errors.PASSWORD1 = "Passwords must match";
    }
    if (!Validator.isLength(data.MOBILE, { min: 10, max: 10 })) {
        errors.MOBILE = "Mobile Number must be 10 digit!!";
    }
    // Email checks
    if (Validator.isEmpty(data.MAIL_ID)) {
        errors.MAIL_ID = "Email field is empty";
    } else if (!Validator.isEmail(data.MAIL_ID)) {
        errors.MAIL_ID = "Email is invalid";
    }
    if (Validator.isEmpty(data.DOB)) {
        errors.DOB = "Date of Birth is not selected!!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
