import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '@/styles/pages/_auth.css';

function LoginPage() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Aplica class auth-page al body (necesario para que _auth.css funcione)
  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  // Redirigir al home si ya está logueado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Toggle mostrar/ocultar contraseña (manteniendo el script original de UI)
    const toggle = document.getElementById('toggle-login-pw');
    const input = document.getElementById('login-password') as HTMLInputElement | null;
    const eyeOpen = toggle?.querySelector('.fa-eye') as HTMLElement | null;
    const eyeClosed = toggle?.querySelector('.fa-eye-slash') as HTMLElement | null;

    function handleToggle() {
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      eyeOpen?.classList.toggle('d-none', isHidden);
      eyeClosed?.classList.toggle('d-none', !isHidden);
    }

    toggle?.addEventListener('click', handleToggle);
    return () => toggle?.removeEventListener('click', handleToggle);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    let valid = true;
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

    if (!valid) return;

    // Llamada al hook
    await login(email, password);
  }

  return (
    <>
      <a href="/" className="auth-back-btn" id="btn-back">
        <i className="fa-solid fa-arrow-left"></i>
        Regresar
      </a>

      <div className="auth-card" id="login-card">
        <img
          src="/img/logo-musclerice..png"
          alt="MuscleRice Logo"
          className="auth-logo"
          id="auth-logo"
        />

        <h1 className="auth-title">Bienvenido de vuelta</h1>
        <p className="auth-subtitle">
          Inicia sesión para acceder a tu cuenta y gestionar tus pedidos.
        </p>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '20px', borderRadius: '8px', padding: '10px 15px', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #ef4444' }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i>
            {error}
          </div>
        )}

        <form id="loginForm" noValidate onSubmit={handleSubmit}>
          <div className="auth-field" id="field-email">
            <input
              type="email"
              id="login-email"
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
              id="login-password"
              name="password"
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa-solid fa-lock field-icon"></i>
            <button type="button" className="toggle-password" id="toggle-login-pw" aria-label="Mostrar contraseña">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-eye-slash"></i>
            </button>
            <span className={`field-error ${passwordError ? 'visible' : ''}`} id="error-password">La contraseña debe tener al menos 6 caracteres</span>
          </div>

          <button type="submit" className={`auth-btn ${loading ? 'loading' : ''}`} id="btn-login" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                <span className="btn-loading-text">Cargando...</span>
              </>
            ) : (
              <span className="btn-text">Iniciar Sesión</span>
            )}
          </button>
        </form>

        <div className="auth-divider">o</div>

        <p className="auth-switch">
          ¿No tienes cuenta? <a href="/registro">Regístrate gratis</a>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
