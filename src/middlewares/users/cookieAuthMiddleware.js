const cookieAuthMiddleware = (req, res, next) => {
  const fs = require('fs');
  const path = require('path');
  const usersFilePath = path.join(__dirname, "../../db/userDataBase.json");
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

  //Si existe la cookie de remember pero, la informacion de la sesion se ha perdido, se debe restaurar la informacion del usuario en la sesion
  if(req.cookies.remember != undefined && req.session.authUser == undefined) {
    let authUser = null;
    
    for(let i = 0; i < users.length; i++) {
      if(users[i].email == req.cookies.remember) {
        authUser = users[i];
        break;
      }
    }

    req.session.authUser = authUser;
  }

  next();
};

module.exports = cookieAuthMiddleware;