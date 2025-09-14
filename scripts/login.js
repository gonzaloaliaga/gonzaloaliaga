let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // detener el envío del formulario

    const correo = document.getElementById("inEmail").value.trim();
    const password = document.getElementById("inPass").value.trim();

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if(usuario){
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});