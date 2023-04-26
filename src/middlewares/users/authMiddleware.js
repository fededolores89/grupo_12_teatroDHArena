const authMiddleware = (req, res, next) => {

  if(req.session.authUser == undefined) {
    res.locals.unAunthenticated = true; //Creo una variable local para indiicar que no esta autenticado
    res.render("users/login"); //Renderizar la vista de login
  } else {
    next();
  }
};

module.exports = authMiddleware;