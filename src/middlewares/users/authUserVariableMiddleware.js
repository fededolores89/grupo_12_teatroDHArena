const authUserVariableMiddleware = (req, res, next) => {
  res.locals.userLogged = req.session.authUser;
  next();
};

module.exports = authUserVariableMiddleware;