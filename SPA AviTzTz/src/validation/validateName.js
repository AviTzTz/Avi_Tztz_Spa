import validate from "./validate.js";

const validateName = (value) => {
  const regex = new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "g");
  return validate("nameValidation",regex, value, 2, 30).map((err) => `Name ${err}`);
};

export default validateName;