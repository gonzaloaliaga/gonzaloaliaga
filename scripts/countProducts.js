function updateCartButton(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let cantidad = carrito.length;

    if (cantidad > 0) {

    document.getElementById("cartButton").innerHTML = `
        <a href="shoppingCart.html" class="button" style="padding: 10px 15px;">Carrito (${cantidad})</a>
    `;
    } else {
    document.getElementById("cartButton").innerHTML = `
        <a href="shoppingCart.html" class="button" style="padding: 10px 15px;">Carrito (${cantidad})</a>
    `;
    }
}

updateCartButton();