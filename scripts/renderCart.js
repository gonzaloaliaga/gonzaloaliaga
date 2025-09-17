  function formatPrice(precio) {
    return "$" + Number(precio || 0).toLocaleString('es-CL');
  }

  function getLoggedUser(){
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (!usuarioLogueado) {
          return;
        }
        return usuarioLogueado;
    } catch(e) {
      console.log("Ha ocurrido un error consiguiendo el usuario logueado: ", e)
    }
  }

  // lee carrito de usuarioLogueado con manejo de errores
  function getCart() {
    try {
      const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
      if (!usuarioLogueado || !Array.isArray(usuarioLogueado.carrito)) {
        return [];
      }
      return usuarioLogueado.carrito;
    } catch(e) {
        console.log("Ha ocurrido un error consiguiendo el carrito del usuario logueado: ", e)
        return [];
    }
  }

  function saveCart(cart) {
    // Actualizar usuario logueado
    usuarioLogueado = getLoggedUser();
    usuarioLogueado.carrito = cart;
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

    // Actualizar lista completa de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioIndex = usuarios.findIndex(u => u.correo === usuarioLogueado.correo);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex] = usuarioLogueado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    // si tienes una función global que actualiza el header, la llamamos
    if (typeof updateCartButton === "function") updateCartButton();
  }

  // renderiza el carrito
  function renderCarrito() {
    const containerBig = document.getElementById("shoppingListBig");
    const containerSmall = document.getElementById("shoppingListSmall");
    const checkoutBig = document.getElementById("checkoutBig");
    const checkoutSmall = document.getElementById("checkoutSmall");
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    if (!containerBig || !containerSmall) {
      console.warn("No existe el elemento con id 'shoppingList' en esta página.");
      return;
    }

    const carrito = getCart();
    console.log("renderCarrito -> carrito:", carrito);

    if (carrito.length === 0) {
      containerBig.innerHTML = `<h1>El carrito está vacío.</h1>`;
      containerSmall.innerHTML = `<h1>El carrito está vacío.</h1>`;
      if (checkoutBig) checkoutBig.innerHTML = "";
      if (checkoutSmall) checkoutBig.innerHTML = "";
      
      if (mediaQuery.matches) {
          document.getElementById("smallScreen").style.display = "flex";
          document.getElementById("bigScreen").style.display = "none";
      } else {
          document.getElementById("smallScreen").style.display = "none";
          document.getElementById("bigScreen").style.display = "flex";
      }
      mediaQuery.addEventListener('change', (event) => {
        if (event.matches) {
          document.getElementById("smallScreen").style.display = "flex";
          document.getElementById("bigScreen").style.display = "none";
        } else {
          document.getElementById("smallScreen").style.display = "none";
          document.getElementById("bigScreen").style.display = "flex";
        }});
      return;
    }

    containerBig.innerHTML = ""; // limpiar antes de renderizar
    containerSmall.innerHTML = ""; // limpiar antes de renderizar
    let total = 0;

    carrito.forEach((item, index) => {
      // Soporta distintos formatos: item puede contener toda la info o solo id/cantidad/precio.
      const id = item.id ?? null;
      const cantidad = Number(item.cantidad ?? 1);
      const precio = Number(item.precio ?? item.price ?? 0);
      const nombre = item.nombre ?? item.name ?? "Sin nombre";
      const imagen = item.imagen ?? item.image ?? "assets/placeholder.jpg";
      // Asegurar que descripcionFull sea string para evitar .length sobre undefined
      const descripcionFull = String(item.descripcion ?? item.description ?? "");
      const descripcionCorta = descripcionFull.length > 100 ? descripcionFull.slice(0, 100) + "..." : descripcionFull;

      const subtotal = precio * cantidad;
      total += subtotal;

      const div = document.createElement("div");

      if (mediaQuery.matches) {
        document.getElementById("smallScreen").style.display = "flex";
        document.getElementById("bigScreen").style.display = "none";
        
        // Crear contenedor del producto
        div.className = "producto-carrito";
        div.dataset.id = id;
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "12px";
        div.style.border = "1px solid #ccc";
        div.style.padding = "8px";
        div.style.margin = "8px 0";
        div.style.width = "90%";

        div.innerHTML = `
          <div style="width:100px; flex-shrink:0;">
            <a href="productDetails.html?id=${id}">
                <img src="${imagen}" alt="${nombre}" style="width:100px; height:130px; object-fit:cover;">
            </a>
          </div>
          <div style="width: 100%; flex-direction: column;">
            <div style="flex:1;">
              <a href="productDetails.html?id=${id}" style="color: black;">
                  <p style="margin:0 0 6px 0;"><strong>${nombre}</strong></p>
              </a>
              <p style="margin:0; color:#555;">${descripcionCorta}</p>
            </div>
            <div style="width:220px; text-align:center;">
              <p style="margin:0 0 6px 0;">${formatPrice(precio)}</p>
              <div style="display:flex; justify-content:center; align-items:center; gap:8px;">
                <button class="btn-decrease" aria-label="disminuir">-</button>
                <span class="cantidad" style="min-width:30px; display:inline-block; text-align:center;">${cantidad}</span>
                <button class="btn-increase" aria-label="aumentar">+</button>
              </div>
              <p style="margin-top:6px;">${formatPrice(subtotal)}</p>
            </div>
          </div>
        `;
        containerSmall.appendChild(div);

      } else {
        document.getElementById("smallScreen").style.display = "none";
        document.getElementById("bigScreen").style.display = "flex";
        // Crear contenedor del producto
        div.className = "producto-carrito";
        div.dataset.id = id;
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "12px";
        div.style.border = "1px solid #ccc";
        div.style.padding = "8px";
        div.style.margin = "8px 0";
        div.style.width = "90%";

        div.innerHTML = `
          <div style="width:100px; flex-shrink:0;">
            <a href="productDetails.html?id=${id}">
                <img src="${imagen}" alt="${nombre}" style="width:100px; height:130px; object-fit:cover;">
            </a>
          </div>
          <div style="flex:1;">
            <a href="productDetails.html?id=${id}" style="color: black;">
                <p style="margin:0 0 6px 0;"><strong>${nombre}</strong></p>
            </a>
            <p style="margin:0; color:#555;">${descripcionCorta}</p>
          </div>
          <div style="width:150px; text-align:center;">
            <p style="margin:0 0 6px 0;">${formatPrice(precio)}</p>
            <div style="display:flex; justify-content:center; align-items:center; gap:8px;">
              <button class="btn-decrease" aria-label="disminuir">-</button>
              <span class="cantidad" style="min-width:30px; display:inline-block; text-align:center;">${cantidad}</span>
              <button class="btn-increase" aria-label="aumentar">+</button>
            </div>
            <p style="margin-top:6px;">${formatPrice(subtotal)}</p>
          </div>
        `;
        containerBig.appendChild(div);
      };

      mediaQuery.addEventListener('change', (event) => {
        if (event.matches) {
          document.getElementById("smallScreen").style.display = "flex";
          document.getElementById("bigScreen").style.display = "none";
          // Crear contenedor del producto
        div.className = "producto-carrito";
        div.dataset.id = id;
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "12px";
        div.style.border = "1px solid #ccc";
        div.style.padding = "8px";
        div.style.margin = "8px 0";
        div.style.width = "90%";

        div.innerHTML = `
          <div style="width:100px; flex-shrink:0;">
            <a href="productDetails.html?id=${id}">
                <img src="${imagen}" alt="${nombre}" style="width:100px; height:130px; object-fit:cover;">
            </a>
          </div>
          <div style="width: 100%; flex-direction: column;">
            <div style="flex:1;">
              <a href="productDetails.html?id=${id}" style="color: black;">
                  <p style="margin:0 0 6px 0;"><strong>${nombre}</strong></p>
              </a>
              <p style="margin:0; color:#555;">${descripcionCorta}</p>
            </div>
            <div style="width:220px; text-align:center;">
              <p style="margin:0 0 6px 0;">${formatPrice(precio)}</p>
              <div style="display:flex; justify-content:center; align-items:center; gap:8px;">
                <button class="btn-decrease" aria-label="disminuir">-</button>
                <span class="cantidad" style="min-width:30px; display:inline-block; text-align:center;">${cantidad}</span>
                <button class="btn-increase" aria-label="aumentar">+</button>
              </div>
              <p style="margin-top:6px;">${formatPrice(subtotal)}</p>
            </div>
          </div>
        `;
        containerSmall.appendChild(div);
        } else {
          document.getElementById("smallScreen").style.display = "none";
          document.getElementById("bigScreen").style.display = "flex";
          // Crear contenedor del producto
          div.className = "producto-carrito";
          div.dataset.id = id;
          div.style.display = "flex";
          div.style.alignItems = "center";
          div.style.gap = "12px";
          div.style.border = "1px solid #ccc";
          div.style.padding = "8px";
          div.style.margin = "8px 0";
          div.style.width = "90%";

          div.innerHTML = `
            <div style="width:100px; flex-shrink:0;">
              <a href="productDetails.html?id=${id}">
                  <img src="${imagen}" alt="${nombre}" style="width:100px; height:130px; object-fit:cover;">
              </a>
            </div>
            <div style="flex:1;">
              <a href="productDetails.html?id=${id}" style="color: black;">
                  <p style="margin:0 0 6px 0;"><strong>${nombre}</strong></p>
              </a>
              <p style="margin:0; color:#555;">${descripcionCorta}</p>
            </div>
            <div style="width:150px; text-align:center;">
              <p style="margin:0 0 6px 0;">${formatPrice(precio)}</p>
              <div style="display:flex; justify-content:center; align-items:center; gap:8px;">
                <button class="btn-decrease" aria-label="disminuir">-</button>
                <span class="cantidad" style="min-width:30px; display:inline-block; text-align:center;">${cantidad}</span>
                <button class="btn-increase" aria-label="aumentar">+</button>
              </div>
              <p style="margin-top:6px;">${formatPrice(subtotal)}</p>
            </div>
          `;
          containerBig.appendChild(div);
        }
        location.reload();
      });

      // localiza el índice actual antes de modificar (por si cambian)
      div.querySelector(".btn-increase").addEventListener("click", () => {
        const cart = getCart();
        // busca por id si existe, si no usamos el índice actual
        const idx = id != null ? cart.findIndex(i => String(i.id) === String(id)) : index;
        if (idx === -1) return;
        cart[idx].cantidad = (cart[idx].cantidad || 0) + 1;
        saveCart(cart);
        renderCarrito();
      });

      div.querySelector(".btn-decrease").addEventListener("click", () => {
        const cart = getCart();
        const idx = id != null ? cart.findIndex(i => String(i.id) === String(id)) : index;
        if (idx === -1) return;
        cart[idx].cantidad = (cart[idx].cantidad || 0) - 1;
        if (cart[idx].cantidad < 1) {
          if (confirm("La cantidad llegó a 0. ¿Deseas eliminar el producto del carrito?")) {
            cart.splice(idx, 1);
          } else {
            cart[idx].cantidad = 1;
          }
        }
        saveCart(cart);
        renderCarrito();
      });

    });

    // mostrar total en checkout (si existe)
    if (checkoutBig) {
      checkoutBig.innerHTML = `
        <p style="font-size:20px; margin:0;">Total:</p>
        <p style="font-size:22px; margin:8px 0 0 0;"><strong>${formatPrice(total)}</strong></p>
      `;
    }
    if (checkoutSmall) {
      checkoutSmall.innerHTML = `
        <p style="font-size:20px; margin:0;">Total:</p>
        <p style="font-size:22px; margin:8px 0 0 0;"><strong>${formatPrice(total)}</strong></p>
      `;
    }

    // actualizar header si existe la función
    if (typeof updateCartButton === "function") updateCartButton();
  }

  // Inicializar al cargar la página
  document.addEventListener("DOMContentLoaded", renderCarrito);