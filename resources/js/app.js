import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type:'success',
            timeout:1000,
            text: "Pizza Added to cart",
            layout:'topLeft'
          }).show();
    }).catch(err=>{
        new Noty({
            type:'error',
            timeout:1000,
            text: "Somthing went wrong",
            layout:'topLeft'
          }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);

        updateCart(pizza)

    })
})