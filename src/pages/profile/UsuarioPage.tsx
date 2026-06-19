import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/pages/_profile.css';

function UsuarioPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('Usuario MuscleRice');
  const [email, setEmail] = useState('correo@musclerice.com');

  useEffect(() => {
    // 1. Validación de sesión
    const usuarioLogueado = localStorage.getItem("usuarioActual");
    const userJSON = localStorage.getItem("usuario");

    if (!usuarioLogueado) {
      // Si no hay usuario en el sistema, lo sacamos al login o registro
      navigate('/login');
      return;
    } else {
      setNombre(usuarioLogueado);

      if (userJSON) {
        try {
          const user = JSON.parse(userJSON);
          if (user && user.email) {
            setEmail(user.email);
          }
        } catch (e) {
          console.error("Error al parsear el usuario del localStorage", e);
        }
      }
    }
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("usuario");
    localStorage.removeItem("mr_auth_token");
    alert("Sesión cerrada correctamente");
    navigate('/');
  };

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-header">
            <div className="perfil-avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <h2 id="nombreUsuario">{nombre}</h2>
            <p id="emailUsuario">{email}</p>
          </div>

          <div className="perfil-opciones">
            <button className="btn-perfil btn-perfil-success">
              <i className="fa-solid fa-box"></i> Mis pedidos
            </button>

            <button className="btn-perfil btn-perfil-primary">
              <i className="fa-solid fa-gear"></i> Configuración
            </button>

            <button className="btn-perfil btn-perfil-danger" id="btnCerrar" onClick={handleCerrarSesion}>
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsuarioPage;
