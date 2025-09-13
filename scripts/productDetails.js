const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Datos de ejemplo (normalmente vendrían de una base de datos o JSON)
const productos = {
    1: { nombre: "Dungeon Meshi [Vol. 1 - 14]", imagen: "products/dunmeshi.webp", precio: "$99.990", descripcion: "Después de que su hermana fuera devorada por un dragón y habiendo perdido todas sus provisiones, Laios y su equipo están decididos a salvar a Farin antes de que sea digerida por la gran bestia. Es así como conocen a un singular enano que los introducirá al mundo gastronómico de las mazmorras: delicias elaboradas a partir de la carne de murciélagos gigantes, hongos caminantes y mandrágoras chillonas."},
    2: {nombre: "Spider Punk (2022) [#1 - 5]", imagen: "products/spiderpunk.jpg", precio: "$124.990", descripcion: "¡SPIDER-PUNK TIENE SU PROPIA SERIE! HOBIE BROWN es EL SPIDER-PUNK ANÁRQUICO, listo para proteger TIERRA-138 con su hacha en mano y su caótica banda de héroes punk rockeros apoyándolo. NORMAN OSBORN ha muerto, pero ¿será el caos que ha creado demasiado para Spider-Punk y su pandilla? ¡Siente la emoción con CODY ZIGLAR (EL INCREÍBLE SPIDER-MAN) y JUSTIN MASON, quienes te traen la música cuando \"BANNED IN DC\" comience aquí!"}
};

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
}