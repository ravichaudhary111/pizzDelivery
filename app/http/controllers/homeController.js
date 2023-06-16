const Menu = require('../../models/menu.js')

function homeController() {
    return {
        async index(req,res) {

            const pizzas = await Menu.find()
            return res.render('home',{pizzas:pizzas})
            // Menu.find().then(function(pizzas){
            //     console.log(pizzas)
            //     return res.render('home',{pizzas:pizzas})
            // })
        }
    }
}

module.exports = homeController;