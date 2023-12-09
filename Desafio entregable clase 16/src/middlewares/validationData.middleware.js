import _ from "lodash";
import { CustomError } from "../utils.js";

function body_must_not_contain_attributes(attributes_to_exclude) {

  return function (req, res, next) {
    try {
      const body_attributes = Object.keys(req.body);

      const found_attribute = body_attributes.find((attribute) =>
        attributes_to_exclude.includes(attribute)
      );

      if (found_attribute) {
        throw new CustomError(400,
          `The attribute '${found_attribute}' is not allowed`
        );
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
}

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

        throw new CustomError(
          400,
          `The body is missing the following attributes: ${missingAttributes}`
        );
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
      throw new CustomError(
        400,
        `The value of the 'email' attribute must be a valid email address`
      );
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
      throw new CustomError(400, "A 'password' attribute is required");
    }

    const passwordRegularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegularExpression.test(password)) {
      throw new CustomError(
        400,
        "The value of 'password' attribute must have at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 characters or longer."
      );
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
  body_must_not_contain_attributes
};
