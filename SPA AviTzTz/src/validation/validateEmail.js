import validate from "./validate.js"

let validateEmail = (value) => {
    const regex = new RegExp(
        "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
        "ig"
      );
    return validate("emailValidation",regex, value, 5, 255).map((err) => `Email ${err}`);
}

export default validateEmail;