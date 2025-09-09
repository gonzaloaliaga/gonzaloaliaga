document.addEventListener("DOMContentLoaded", function() {

  const buttonOpenLogin = document.getElementById("buttonOpenLogin");
  buttonOpenLogin.addEventListener("click", function() {
    console.log("Abrir iniciar sesión presionado")
  });

  const buttonFormLogin = document.getElementById("buttonFormLogin");
  buttonFormLogin.addEventListener("click", function() {
    console.log("Iniciar sesión en formulario presionado")
  });

  const openRegister = document.getElementById("openRegister");
  openRegister.addEventListener("click", function() {
    console.log("Abrir registrar presioando")
  })

  const openHome = document.getElementById("openHome");
  openHome.addEventListener("click", function() {
    console.log("Abrir home presionado")
  })


});