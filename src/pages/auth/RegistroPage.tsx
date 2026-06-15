import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function RegistroPage() {
  useEffect(() => {
    // The logic from auth.ts handles the registration. We assume it's globally loaded or we can just leave the UI here.
  }, []);

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back-btn" id="btn-back">
          <i className="fa-solid fa-arrow-left"></i>
          Regresar
      </Link>

      <div className="auth-card" id="register-card">
          <img 
              src="/img/logo-musclerice..png" 
              alt="MuscleRice Logo" 
              className="auth-logo"
              id="auth-logo"
          />

          <h1 className="auth-title">Crea tu cuenta</h1>
          <p className="auth-subtitle">
              Únete a la comunidad MuscleRice y empieza a potenciar tu rendimiento.
          </p>

          <form id="registerForm" noValidate>
              <div className="auth-field" id="field-name">
                  <input 
                      type="text" 
                      id="register-name" 
                      name="nombre" 
                      placeholder="Tu nombre completo"
                      autoComplete="name"
                      required
                  />
                  <i className="fa-solid fa-user field-icon"></i>
                  <span className="field-error" id="error-name">Ingresa tu nombre completo (mínimo 3 caracteres)</span>
              </div>

              <div className="auth-field" id="field-email">
                  <input 
                      type="email" 
                      id="register-email" 
                      name="email" 
                      placeholder="tucorreo@ejemplo.com"
                      autoComplete="email"
                      required
                  />
                  <i className="fa-solid fa-envelope field-icon"></i>
                  <span className="field-error" id="error-email">Ingresa un correo electrónico válido</span>
              </div>

              <div className="auth-field" id="field-password">
                  <input 
                      type="password" 
                      id="register-password" 
                      name="password" 
                      placeholder="Crea una contraseña segura"
                      autoComplete="new-password"
                      required
                  />
                  <i className="fa-solid fa-lock field-icon"></i>
                  <button type="button" className="toggle-password" id="toggle-register-pw" aria-label="Mostrar contraseña">
                      <i className="fa-solid fa-eye"></i>
                      <i className="fa-solid fa-eye-slash"></i>
                  </button>
                  <span className="field-error" id="error-password">La contraseña debe tener al menos 6 caracteres</span>
              </div>

              <div className="password-strength" id="password-strength">
                  <div className="strength-bar"></div>
                  <div className="strength-bar"></div>
                  <div className="strength-bar"></div>
                  <div className="strength-bar"></div>
              </div>
              <p className="strength-text" id="strength-text"></p>

              <div className="auth-field" id="field-confirm">
                  <input 
                      type="password" 
                      id="register-confirm" 
                      name="confirm" 
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      required
                  />
                  <i className="fa-solid fa-shield-halved field-icon"></i>
                  <button type="button" className="toggle-password" id="toggle-register-confirm" aria-label="Mostrar contraseña">
                      <i className="fa-solid fa-eye"></i>
                      <i className="fa-solid fa-eye-slash"></i>
                  </button>
                  <span className="field-error" id="error-confirm">Las contraseñas no coinciden</span>
              </div>

              <button type="submit" className="auth-btn" id="btn-register">
                  <span className="btn-text">Crear Cuenta</span>
                  <span className="btn-spinner"></span>
                  <span className="btn-loading-text">Creando tu cuenta...</span>
              </button>
          </form>

          <div className="auth-divider">o</div>

          <p className="auth-switch">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
      </div>

      <div className="auth-toast" id="auth-toast">
          <i className="fa-solid fa-circle-check"></i>
          <span id="toast-message">Cuenta creada exitosamente</span>
      </div>
    </div>
  );
}

export default RegistroPage;
