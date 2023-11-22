import jwt from "jsonwebtoken";

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() || jwtValid(req, res, next)) {
    next();
  } else {
    res.redirect("http://localhost:8080/login");
  }
}

function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated() && !jwtValid(req, res, next)) {
    next();
  } else {
    res.redirect("http://localhost:8080/products");
  }
}

function jwtValid(req, res, next) {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.replace("Bearer ", "");
    const responseToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = responseToken;
    return responseToken;
  } catch (error) {
    next(error);
  }
}

export { isAuthenticated, isNotAuthenticated };
