// js/auth.js
// MuscleRice Authentication helper - frontend

const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. MANEJAR FORMULARIO DE REGISTRO
    // -------------------------------------------------------------
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.strip ? document.getElementById("nombre").value.trim() : document.getElementById("nombre").value;
            const email = document.getElementById("email").value.strip ? document.getElementById("email").value.trim() : document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm").value;

            // Validación básica en frontend
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/registro`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nombre, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.mensaje || "Error al registrar el usuario");
                    return;
                }

                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                window.location.href = "login.html";

            } catch (err) {
                console.error("Error en registro:", err);
                alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
            }
        });
    }

    // -------------------------------------------------------------
    // 2. MANEJAR FORMULARIO DE LOGIN
    // -------------------------------------------------------------
    const loginForm = document.getElementById("loginForm");
    const mensajeError = document.getElementById("mensajeError");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim ? document.getElementById("email").value.trim() : document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (mensajeError) mensajeError.style.display = "none";

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    if (mensajeError) {
                        mensajeError.innerText = data.mensaje || "Error al iniciar sesión";
                        mensajeError.style.display = "block";
                    } else {
                        alert(data.mensaje || "Error al iniciar sesión");
                    }
                    return;
                }

                // Guardar datos en localStorage
                localStorage.setItem("usuarioActual", data.usuario.nombre);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                alert(`¡Bienvenido de nuevo, ${data.usuario.nombre}!`);
                window.location.href = "index.html";

            } catch (err) {
                console.error("Error en login:", err);
                if (mensajeError) {
                    mensajeError.innerText = "No se pudo conectar con el servidor.";
                    mensajeError.style.display = "block";
                } else {
                    alert("No se pudo conectar con el servidor.");
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 3. ACTUALIZAR INTERFAZ DINÁMICAMENTE SEGÚN SESIÓN (Header)
    // -------------------------------------------------------------
    const usuarioLogueado = localStorage.getItem("usuarioActual");
    const accountActions = document.querySelector(".account-actions");

    if (accountActions && usuarioLogueado) {
        accountActions.innerHTML = `
            <a href="usuario.html" class="btn-auth" aria-label="Mi Cuenta">
                <i class="fa fa-user-circle-o"></i>
                <span>Mi Cuenta (${usuarioLogueado})</span>
            </a>
            <a href="#" id="btnHeaderCerrar" class="btn-auth btn-auth-register" aria-label="Cerrar sesión">
                <i class="fa fa-sign-out"></i>
                <span>Cerrar sesión</span>
            </a>
        `;

        // Configurar botón de cerrar sesión en el header
        const btnHeaderCerrar = document.getElementById("btnHeaderCerrar");
        if (btnHeaderCerrar) {
            btnHeaderCerrar.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                    localStorage.removeItem("usuarioActual");
                    localStorage.removeItem("usuario");
                    alert("Sesión cerrada correctamente.");
                    window.location.reload();
                }
            });
        }
    }
});
