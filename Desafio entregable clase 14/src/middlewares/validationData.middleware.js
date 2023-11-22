import _ from "lodash";

function body_must_contain_attributes(mustAttributes) {
  return function (req, res, next) {
    try {
      const bodyAttributes = Object.keys(req.body);

      const intersectedAttributes = _.intersection(
        bodyAttributes,
        mustAttributes
      );

      if (!_.isEqual(intersectedAttributes.sort(), mustAttributes.sort())) {
        const missingAttributes = _.difference(mustAttributes, bodyAttributes);
        return res.status(400).json({
          message: `The body is missing the following attributes: ${missingAttributes}`,
        });
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
}

function meetsWithEmailRequirements(req, res, next) {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        message: "An 'email' attribute is required",
      });
    }

    const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegularExpression.test(email)) {
      return res.status(422).json({
        message: `The value of the 'email' attribute must be a valid email address`,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
}

function meetsWithPasswordRequirements(req, res, next) {
  try {
    const password = req.body.password;

    if (!password) {
      return res.status(400).json({
        message: "A 'password' attribute is required",
      });
    }

    const passwordRegularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegularExpression.test(password)) {
      return res.status(422).json({
        message:
          "The value of 'password' attribute must have at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 characters or longer.",
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
}

export {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
};
