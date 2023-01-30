const adminMiddleware = (req, res, next) => {
  if(req.session.authUser != undefined && req.session.authUser.userType == 2) {
    next();
  } else {
    res.send('No tiene los permisos para ingresar a este sitio');
  }
};

module.exports = adminMiddleware;