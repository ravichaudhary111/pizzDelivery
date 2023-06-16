const homeController = require('../app/http/controllers/homeController.js');
const authController = require('../app/http/controllers/authController.js');
const cartController = require('../app/http/controllers/customers/cartController.js');
const guest = require('../app/http/middleware/guest.js');


function initRoutes(app) {

    app.get('/', homeController().index)
    

    app.get('/login',guest,authController().login)
    app.post('/login',authController().postlogin)

    app.get('/register',guest,authController().register)
    app.post('/register',authController().create)

    app.post('/logout',authController().logout)

    app.post('/update-cart',cartController().update)
    app.get('/cart', cartController().index)

}

module.exports = initRoutes;