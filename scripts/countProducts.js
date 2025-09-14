function updateCartButton(){
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || [];

    let carrito = usuarioLogueado.carrito || [];

    let cantidad = carrito.length;

    if (cantidad > 0) {

    document.getElementById("cartButton").innerHTML = `
        <a href="shoppingCart.html" class="button" style="padding: 10px 15px;">Carrito (${cantidad})</a>
    `;
    } else {
    document.getElementById("cartButton").innerHTML = `
        <a href="shoppingCart.html" class="button" style="padding: 10px 15px;">Carrito</a>
    `;
    }
}

updateCartButton();