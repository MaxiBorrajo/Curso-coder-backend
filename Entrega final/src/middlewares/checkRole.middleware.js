function isAdmin(req, res, next) {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    res.redirect(process.env.URL_FRONTEND)
  }
}

export default isAdmin;
