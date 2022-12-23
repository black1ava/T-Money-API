module.exports = function (error, errors, option, casting) {
  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(function (error) {
      errors[error.path] = error.message;
    });
  }

  if (option && option.code) {
    if (error.code === option.code) {
      errors[option.key] = option.message;
    }
  }

  if (error.name === "CastError") {
    casting.forEach(function (c) {
      if (error.message.includes(c.name)) {
        errors[c.key] = `${c.name} is invalid`;
      }
    });
  }

  return errors;
};
