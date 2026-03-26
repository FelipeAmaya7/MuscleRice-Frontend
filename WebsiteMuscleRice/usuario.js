// Todo el código debe ir dentro de DOMContentLoaded para asegurar que el HTML ya exista
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Validación de sesión
    const usuarioLogueado = localStorage.getItem("usuarioActual"); 

    if (!usuarioLogueado) {
        // Si no hay usuario en el sistema, lo sacamos al registro
        window.location.href = "registro.html";
    } else {
        console.log("Acceso concedido a MuscleRice");
        
        // OPCIONAL: Mostrar el nombre real en el perfil
        const nombreUI = document.getElementById("nombreUsuario");
        if (nombreUI) {
            nombreUI.innerText = usuarioLogueado;
        }
    }

    // 2. Configuración del botón Cerrar Sesión
    const botonCerrar = document.getElementById("btnCerrar");
    
    if (botonCerrar) {
        botonCerrar.addEventListener("click", () => {
            // Borramos el usuario para que la protección funcione la próxima vez
            localStorage.removeItem("usuarioActual");
            alert("Sesión cerrada correctamente");
            window.location.href = "index.html";
        });
    }
});