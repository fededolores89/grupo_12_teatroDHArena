const db = require('../../database/models');

const totalOrdersMiddleware = async (req, res, next) => {
  //Si el usuario ya esta logueado almacenar en una variable global el resultado del conteo de orders
  if(req.session.authUser != undefined) {
    const loggedUser = req.session.authUser; //Alamacenar los datos del usuario logueado en una variable local para usarla en la busqueda
    
    //Hacer conteo de ordenes por el id del usuario logueado
    let ordersCount = await db.Orders.count({
      where: {
          user_id: loggedUser.id
      }
    }).then(result => result);

    //Si se encuentra una cantidad de ordenes, guardarla en una variable de session
    if(ordersCount > 0) {

      //Guardar en una variable global el valor del conteo
      res.locals.orders = ordersCount;
    }

    next();

  } else {
    next();
  }
}

module.exports = totalOrdersMiddleware;