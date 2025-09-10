document.addEventListener("DOMContentLoaded", function() {
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");

  /* HEADER */
  const openHome = document.getElementById("openHome");
  openHome.addEventListener("click", function() {
    console.log("Abrir home presionado")

    /* LLEVAR A HOME SENCILLO */
  })

  const buttonOpenLogin = document.getElementById("buttonOpenLogin");
  buttonOpenLogin.addEventListener("click", function() {
    console.log("Abrir iniciar sesión presionado")
    formLogin.style.display = "block"
    formRegister.style.display = "none"
  });

  /* LOGIN FORM */
  const buttonFormLogin = document.getElementById("buttonFormLogin");
  buttonFormLogin.addEventListener("click", function() {
    console.log("Iniciar sesión en formulario presionado")

    /* VALIDAR INICIO CORRECTAMENTE */
  });

  const openRegister = document.getElementById("openRegister");
  openRegister.addEventListener("click", function() {
    console.log("Abrir registrar presionado")
    formLogin.style.display = "none"
    formRegister.style.display = "block"
  })

  /* REGISTER FORM */
  const buttonRegisterPet = document.getElementById("buttonRegisterPet");
  buttonRegisterPet.addEventListener("click", function() {
    console.log("Añadir nuevo registro presionado")

    /* VALIDACIÓN DE REGISTRO, LUEGO OCULTAR REGISTRO E IR A HOME */
  })

  const buttonDeletePet = document.getElementById("buttonDeletePet");
  buttonDeletePet.addEventListener("click", function() {
    console.log("Eliminar registro de mascota presionado")

    /* ELIMINACIÓN DE MASCOTA, MOSTRANDO MENSAJE DE ÉXITO */
  })

});