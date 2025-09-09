document.addEventListener("DOMContentLoaded", function() {
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");

  /* HEADER */
  const openHome = document.getElementById("openHome");
  openHome.addEventListener("click", function() {
    console.log("Abrir home presionado")
  })

  const buttonOpenLogin = document.getElementById("buttonOpenLogin");
  buttonOpenLogin.addEventListener("click", function() {
    console.log("Abrir iniciar sesión presionado")
  });

  /* LOGIN FORM */
  const buttonFormLogin = document.getElementById("buttonFormLogin");
  buttonFormLogin.addEventListener("click", function() {
    console.log("Iniciar sesión en formulario presionado")
  });

  const openRegister = document.getElementById("openRegister");
  openRegister.addEventListener("click", function() {
    console.log("Abrir registrar presionado")
  })

  /* REGISTER FORM */
  const buttonRegisterPet = document.getElementById("buttonRegisterPet");
  openRegister.addEventListener("click", function() {
    console.log("Añadir nuevo registro presionado")
  })

});