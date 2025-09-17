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
                        $${producto.precio.toLocaleString('es-CL')}
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
                        <button id="addToCart" class="button" style="font-size: 20px; background-color: rgb(76, 185, 249); color: white;">AGREGAR AL CARRITO</button>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 90%">
            <div style="width: 70%; height: 100px; display: flex; align-items: center; justify-content: flex-start; border: 2px solid black; border-top: 0px; background-color: rgb(231, 231, 231);">
                <a href="#">
                    <img id="imagen2" style="margin: 0px 10px; height: 80px;" src="${producto.imagen2}">
                </a>
                <a href="#">
                    <img id="imagen3" style="margin: 0px 10px; height: 80px;" src="${producto.imagen3}">
                </a>
                <a href="#">
                    <img id="imagen4" style="margin: 0px 10px; height: 80px;" src="${producto.imagen4}">
                </a>
            </div>
        </div>
    `;

    document.title = "ComiCommerce | "+ producto.nombre;

    document.addEventListener("DOMContentLoaded", () => {
        const imagen2 = document.getElementById("imagen2");
        const imagen3 = document.getElementById("imagen3");
        const imagen4 = document.getElementById("imagen4");

        imagen2.addEventListener("click", (event) => {
            document.getElementById("imgContainer").innerHTML = `<img id="productImg" src="${producto.imagen2}">`;
        });
        imagen3.addEventListener("click", (event) => {
            document.getElementById("imgContainer").innerHTML = `<img id="productImg" src="${producto.imagen3}">`;
        });
        imagen4.addEventListener("click", (event) => {
            document.getElementById("imgContainer").innerHTML = `<img id="productImg" src="${producto.imagen4}">`;
        });
    });

    document.getElementById("addToCart").addEventListener("click", function() {

        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(!usuarioLogueado) {
            alert("Debes iniciar sesión para añadir productos al carrito.")
            return;
        }

        const cantidad = parseInt(document.getElementById("productCantidad").value);
        if(isNaN(cantidad) || cantidad < 1) {
            alter("Ingrese una cantidad válida.");
            return;
        }

        let carrito = usuarioLogueado.carrito || [];

        const index = carrito.findIndex(item => item.id == id);
        if(index !== -1){
            carrito[index].cantidad += cantidad;
        } else {
            carrito.push({id: id, nombre: producto.nombre, imagen: producto.imagen, precio: producto.precio, cantidad: cantidad, descripcion: producto.descripcion})
        }

        usuarioLogueado.carrito = carrito;

        // actualizar usuario logueado
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

        // actualizar la lista de todos los usuarios
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioIndex = usuarios.findIndex(u => u.correo === usuarioLogueado.correo);
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        updateCartButton();
        alert(`"${producto.nombre}" x ${cantidad} agregado al carrito`);
    });

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