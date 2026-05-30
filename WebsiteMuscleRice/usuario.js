// Todo el código debe ir dentro de DOMContentLoaded para asegurar que el HTML ya exista
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Validación de sesión
    const usuarioLogueado = localStorage.getItem("usuarioActual"); 
    const userJSON = localStorage.getItem("usuario");

    if (!usuarioLogueado) {
        // Si no hay usuario en el sistema, lo sacamos al registro
        window.location.href = "registro.html";
        return;
    } else {
        console.log("Acceso concedido a MuscleRice");
        
        // Mostrar el nombre real en el perfil
        const nombreUI = document.getElementById("nombreUsuario");
        if (nombreUI) {
            nombreUI.innerText = usuarioLogueado;
        }

        // Mostrar el correo real si está disponible
        const emailUI = document.getElementById("emailUsuario");
        if (emailUI && userJSON) {
            try {
                const user = JSON.parse(userJSON);
                if (user && user.email) {
                    emailUI.innerText = user.email;
                }
            } catch (e) {
                console.error("Error al parsear el usuario del localStorage", e);
            }
        }
    }

    // 2. Configuración del botón Cerrar Sesión
    const botonCerrar = document.getElementById("btnCerrar");
    
    if (botonCerrar) {
        botonCerrar.addEventListener("click", () => {
            // Borramos el usuario para que la protección funcione la próxima vez
            localStorage.removeItem("usuarioActual");
            localStorage.removeItem("usuario");
            alert("Sesión cerrada correctamente");
            window.location.href = "index.html";
        });
    }
});