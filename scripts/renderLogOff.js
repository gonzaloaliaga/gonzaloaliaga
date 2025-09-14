const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"))

if (usuarioLogueado) {
    let logOff = document.getElementById("logOff");

    
    logOff.innerHTML = `
        <button id="buttonLogOff" class="button">CERRAR SESIÓN</button>    
    `;

    document.getElementById("logIn").innerHTML = ``;

    document.getElementById("buttonLogOff").addEventListener("click", function() {
        if(confirm("¿Deseas cerrar sesión?")) {
            localStorage.removeItem("usuarioLogueado");
            location.reload();
        }
    });

} else {
    document.getElementById("logIn").innerHTML = `
                <div id="loginRegisterDivBig">
                    <a href="loginPage.html" style="white-space: nowrap;">Iniciar sesión</a>
                    <a style="margin: 5px 5px;">|</a>
                    <a href="registerPage.html" style="white-space: nowrap;">Registrar usuario</a>
                </div>
                <div id="loginRegisterDivSmall">
                    <div style="width: 33%;"></div>
                    <div style="width: 33%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                        <a href="loginPage.html" style="white-space: nowrap;">Iniciar sesión</a>
                        <a style="margin: 5px 5px;">|</a>
                        <a href="registerPage.html" style="white-space: nowrap;">Registrar usuario</a>
                    </div>
                    <div style="width: 33%;"></div>
                </div>
    `;
}