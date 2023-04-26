const authMiddleware = (req, res, next) => {

  if(req.session.authUser == undefined) {
    res.send('Debe iniciar sesion');
  } else {
    next();
  }
};

module.exports = authMiddleware;