// LoginPage.tsx — Migración 1:1 de login.html
// Regla: class → className | <img> y <input> autocerrados | CERO wrappers nuevos

import { useEffect } from 'react';
import '@/styles/pages/_auth.css';

function LoginPage() {

  // Aplica class auth-page al body (necesario para que _auth.css funcione)
  // y la limpia al salir de la ruta para no afectar otras páginas
  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  useEffect(() => {
    // Toggle mostrar/ocultar contraseña
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
    const form = e.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>('#login-email');
    const passwordInput = form.querySelector<HTMLInputElement>('#login-password');
    const btn = document.getElementById('btn-login') as HTMLButtonElement | null;
    const toast = document.getElementById('auth-toast');
    const toastMsg = document.getElementById('toast-message');

    // Validación básica
    let valid = true;
    if (!emailInput?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      document.getElementById('error-email')?.classList.add('visible');
      valid = false;
    } else {
      document.getElementById('error-email')?.classList.remove('visible');
    }
    if (!passwordInput?.value || passwordInput.value.length < 6) {
      document.getElementById('error-password')?.classList.add('visible');
      valid = false;
    } else {
      document.getElementById('error-password')?.classList.remove('visible');
    }
    if (!valid) return;

    // Estado de carga
    if (btn) btn.classList.add('loading');

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput?.value,
          password: passwordInput?.value,
        }),
      });

      if (res.ok) {
        if (toastMsg) toastMsg.textContent = 'Sesión iniciada correctamente';
        toast?.classList.add('show');
        setTimeout(() => { window.location.href = '/'; }, 1500);
      } else {
        const data = await res.json().catch(() => ({}));
        if (toastMsg) toastMsg.textContent = data?.message || 'Credenciales incorrectas';
        toast?.classList.add('show', 'error');
        setTimeout(() => toast?.classList.remove('show', 'error'), 3500);
      }
    } catch {
      if (toastMsg) toastMsg.textContent = 'Error de conexión. Intenta de nuevo.';
      toast?.classList.add('show', 'error');
      setTimeout(() => toast?.classList.remove('show', 'error'), 3500);
    } finally {
      if (btn) btn.classList.remove('loading');
    }
  }

  return (
    <>
      {/* BOTÓN REGRESAR */}
      <a href="/" className="auth-back-btn" id="btn-back">
        <i className="fa-solid fa-arrow-left"></i>
        Regresar
      </a>

      {/* TARJETA DE LOGIN */}
      <div className="auth-card" id="login-card">
        {/* Logo */}
        <img
          src="/img/logo-musclerice..png"
          alt="MuscleRice Logo"
          className="auth-logo"
          id="auth-logo"
        />

        {/* Header */}
        <h1 className="auth-title">Bienvenido de vuelta</h1>
        <p className="auth-subtitle">
          Inicia sesión para acceder a tu cuenta y gestionar tus pedidos.
        </p>

        {/* Formulario */}
        <form id="loginForm" noValidate onSubmit={handleSubmit}>
          {/* Campo: Correo Electrónico */}
          <div className="auth-field" id="field-email">
            <input
              type="email"
              id="login-email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
              required
            />
            <i className="fa-solid fa-envelope field-icon"></i>
            <span className="field-error" id="error-email">Ingresa un correo electrónico válido</span>
          </div>

          {/* Campo: Contraseña */}
          <div className="auth-field" id="field-password">
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
            />
            <i className="fa-solid fa-lock field-icon"></i>
            {/* Botón toggle: mostrar/ocultar contraseña */}
            <button type="button" className="toggle-password" id="toggle-login-pw" aria-label="Mostrar contraseña">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-eye-slash"></i>
            </button>
            <span className="field-error" id="error-password">La contraseña debe tener al menos 6 caracteres</span>
          </div>

          {/* Botón Submit con estado de carga */}
          <button type="submit" className="auth-btn" id="btn-login">
            <span className="btn-text">Iniciar Sesión</span>
            <span className="btn-spinner"></span>
            <span className="btn-loading-text">Verificando credenciales...</span>
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">o</div>

        {/* Link alternativo */}
        <p className="auth-switch">
          ¿No tienes cuenta? <a href="/registro">Regístrate gratis</a>
        </p>
      </div>

      {/* TOAST DE NOTIFICACIÓN */}
      <div className="auth-toast" id="auth-toast">
        <i className="fa-solid fa-circle-check"></i>
        <span id="toast-message">Sesión iniciada correctamente</span>
      </div>
    </>
  );
}

export default LoginPage;
