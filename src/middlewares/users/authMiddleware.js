const authMiddleware = (req, res, next) => {
  if(req.session.authUser == undefined) {
    res.send('Debe iniciar sesion para abrir esta pagina');
  } else {
    next();
  }
};

module.exports = authMiddleware;