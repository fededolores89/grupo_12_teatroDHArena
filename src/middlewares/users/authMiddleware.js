const authMiddleware = (req, res, next) => {

  if(req.session.authUser == undefined) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = authMiddleware;