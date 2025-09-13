const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Mostrar la información del producto
const producto = productos[id];
if (producto) {
    document.getElementById("history").innerHTML = `
        <div id="historyBig">
            <a href="index.html" style="white-space: nowrap;">Home</a>
            <a style="margin: 0px 5px;">></a>
            <a style="white-space: nowrap;">${producto.nombre}</a>
        </div>
        <div id="historySmall">
            <div style="width: 33%;"></div>
            <div style="width: 33%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <a href="index.html" style="white-space: nowrap;">Home</a>
                <a style="margin: 5px 5px;">></a>
                <a style="white-space: nowrap;">${producto.nombre}</a>
            </div>
            <div style="width: 33%;"></div>
        </div>
    `;

    document.getElementById("productDetails").innerHTML = `
        <div id="productDetailsContainer">
            <div id="imgBox">
                <div id="imgContainer">
                    <img id="productImg" src="${producto.imagen}">
                </div>
            </div>
            <div id="textBox">
                <div id="titleContainer">
                    <h4>
                        ${producto.nombre}
                    </h4>
                    <p>
                        ${producto.precio}
                    </p>
                </div>
                <div id="descContainer">
                    <p>
                        ${producto.descripcion}
                    </p>
                </div>
                <div id="inputBox">
                    <div id="inputContainer">
                        <div id="productCantidadContainer">
                            <h4>
                                Cantidad
                            </h4>
                            <input id="productCantidad" type="number" min="1" value="1">
                        </div>
                        <button id="addToCart" class="button">AGREGAR AL CARRITO</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("addToCart").addEventListener("click", function() {
    const cantidad = parseInt(document.getElementById("productCantidad").value);
    if(isNaN(cantidad) || cantidad < 1) {
        alter("Ingrese una cantidad válida.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.id);
    if(index !== -1){
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({id: id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad})
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`"${producto.nombre}" x ${cantidad} agregado al carrito`)
  })

} else {
    document.getElementById("productDetails").innerHTML = `
        <div id="productDetailsContainer">
            <div id="imgBox">
                <div id="imgContainer" style="align-items: center">
                    <h1>
                        Foto no disponible
                    <h1>
                </div>
            </div>
            <div id="textBox">
                <div id="titleContainer">
                    <h4>
                        Producto no encontrado
                    </h4>
                    <p>
                        
                    </p>
                </div>
                <div id="descContainer">
                    <p>
                        Ha ocurrido un error o no se ha encontrado el producto que buscabas. Vuelve a intentarlo más tarde.
                    </p>
                </div>
            </div>
        </div>
    `;
}