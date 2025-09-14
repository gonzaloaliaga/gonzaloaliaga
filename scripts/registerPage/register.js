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
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Validaciones personalizadas
    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return;
    }

    if (usuarios.some(u => u.correo === correo)) {
        alert("El correo ya está registrado.");
        return;
    }

    const dominiosPermitidos = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];

    const correoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

    if (!correoValido) {
        alert("El dominio del correo es inválido. Debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl");
        return;
    }

    if (correo !== correoConfirm) {
        alert("Los correos deben coincidir.");
        return;
    }

    if (password.length <= 4 || password.length >= 10) {
        alert("La contraseña debe tener al menos 5 caracteres y menos de 10.");
        return;
    }

    if (password !== passwordConfirm) {
        alert("Las contraseñas deben coincidir.");
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