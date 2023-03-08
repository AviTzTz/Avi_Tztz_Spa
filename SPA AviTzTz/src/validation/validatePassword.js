import validate from "./validate.js";

const validatePassword = (value) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$",
    "g"
  );
  return validate("passwordValidation",regex, value, 5, 255).map((err) => `Password ${err}`);
};

export default validatePassword;