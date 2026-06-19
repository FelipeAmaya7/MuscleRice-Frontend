import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import '@/styles/pages/_auth.css';

function RegistroPage() {
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let valid = true;
    if (!name || name.length < 3) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!confirmPassword || confirmPassword !== password) {
      setConfirmError(true);
      valid = false;
    } else {
      setConfirmError(false);
    }

    if (!valid) return;

    await register({ name, email, password });
  }

  return (
    <>
      <Link to="/" className="auth-back-btn" id="btn-back">
          <i className="fa-solid fa-arrow-left"></i>
          Regresar
      </Link>

      <div className="auth-card" id="register-card">
          <img 
              src="/img/logo-musclerice..webp" 
              alt="MuscleRice Logo" 
              className="auth-logo"
              id="auth-logo"
          />

          <h1 className="auth-title">Crea tu cuenta</h1>
          <p className="auth-subtitle">
              Únete a la comunidad MuscleRice y empieza a potenciar tu rendimiento.
          </p>

          {error && (
            <div className="alert alert-danger">
              <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i>
              {error}
            </div>
          )}

          <form id="registerForm" noValidate onSubmit={handleSubmit}>
              <div className="auth-field" id="field-name">
                  <input 
                      type="text" 
                      id="register-name" 
                      name="nombre" 
                      placeholder="Tu nombre completo"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <i className="fa-solid fa-user field-icon"></i>
                  <span className={`field-error ${nameError ? 'visible' : ''}`} id="error-name">Ingresa tu nombre completo (mínimo 3 caracteres)</span>
              </div>

              <div className="auth-field" id="field-email">
                  <input 
                      type="email" 
                      id="register-email" 
                      name="email" 
                      placeholder="tucorreo@ejemplo.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="fa-solid fa-envelope field-icon"></i>
                  <span className={`field-error ${emailError ? 'visible' : ''}`} id="error-email">Ingresa un correo electrónico válido</span>
              </div>

              <div className="auth-field" id="field-password">
                  <input 
                      type="password" 
                      id="register-password" 
                      name="password" 
                      placeholder="Crea una contraseña segura"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="fa-solid fa-lock field-icon"></i>
                  <span className={`field-error ${passwordError ? 'visible' : ''}`} id="error-password">La contraseña debe tener al menos 6 caracteres</span>
              </div>

              <div className="auth-field" id="field-confirm">
                  <input 
                      type="password" 
                      id="register-confirm" 
                      name="confirm" 
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i className="fa-solid fa-shield-halved field-icon"></i>
                  <span className={`field-error ${confirmError ? 'visible' : ''}`} id="error-confirm">Las contraseñas no coinciden</span>
              </div>

              <button type="submit" className={`auth-btn ${loading ? 'loading' : ''}`} id="btn-register" disabled={loading}>
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span className="btn-loading-text">Cargando...</span>
                  </>
                ) : (
                  <span className="btn-text">Crear Cuenta</span>
                )}
              </button>
          </form>

          <div className="auth-divider">o</div>

          <p className="auth-switch">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
      </div>
    </>
  );
}

export default RegistroPage;
