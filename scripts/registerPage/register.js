let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // detener el envío del formulario

    const nombre = document.getElementById("inName").value.trim();
    const correo = document.getElementById("inEmail").value.trim();
    const correoConfirm = document.getElementById("inConfirmEmail").value.trim();
    const password = document.getElementById("inPass").value.trim();
    const passwordConfirm = document.getElementById("inConfirmPass").value.trim();
    const telefono = document.getElementById("inPhone").value.trim();
    const region = document.getElementById("region").value.trim();
    const comuna = document.getElementById("comuna").value.trim();

    const mensaje = document.getElementById("mensaje");

    // Validaciones personalizadas
    if (nombre.length < 3) {
        mensaje.textContent = "El nombre debe tener al menos 3 caracteres.";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    if (usuarios.some(u => u.correo === correo)) {
        mensaje.textContent = "El correo ya está registrado.";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    const dominiosPermitidos = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];

    const correoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

    if (!correoValido) {
        mensaje.textContent = "El dominio del correo es inválido. Debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    if (correo !== correoConfirm) {
        mensaje.textContent = "Los correos deben coincidir.";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    if (password.length <= 4 || password.length >= 10) {
        mensaje.textContent = "La contraseña debe tener al menos 5 caracteres y menos de 10.";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    if (password !== passwordConfirm) {
        mensaje.textContent = "Las contraseñas deben coincidir.";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "background-color: rgb(148, 2, 2)";
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        telefono: telefono,
        region: region,
        comuna : comuna,
        carrito: []
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

    // Si todo pasa
    alert("Registro exitoso. Gracias por crear tu cuenta.");

    window.location.href = "index.html";
  });