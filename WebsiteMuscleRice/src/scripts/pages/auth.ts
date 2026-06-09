/**
 * ================================================================
 * auth.ts — Módulo de Autenticación MuscleRice
 * ================================================================
 * 
 * Arquitectura:  Modular TypeScript
 */

// URL base para el API (vía proxy en Vite, o ruta relativa en prod)
const API_URL = '';

// =========================================
// 1. VALIDADORES PUROS (sin side effects)
// =========================================

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 3;
};

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const STRENGTH_LABELS = ['', 'Débil', 'Regular', 'Buena', 'Fuerte 💪'];

// =========================================
// 2. FUNCIONES DE UI (manipulan el DOM)
// =========================================

const setFieldError = (fieldId: string, show: boolean): void => {
  const field = document.getElementById(fieldId);
  if (!field) return;

  if (show) {
    field.classList.add('has-error');
    field.classList.remove('is-valid');
    const input = field.querySelector('input');
    if (input) {
      input.classList.add('shake');
      setTimeout(() => {
        input.classList.remove('shake');
      }, 500);
    }
  } else {
    field.classList.remove('has-error');
    field.classList.add('is-valid');
  }
};

const clearFieldState = (fieldId: string): void => {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.remove('has-error', 'is-valid');
};

const setLoadingState = (button: HTMLButtonElement, isLoading: boolean): void => {
  if (!button) return;
  button.disabled = isLoading;
  if (isLoading) {
    button.classList.add('is-loading');
  } else {
    button.classList.remove('is-loading');
  }
};

const showToast = (message: string, type: 'success' | 'error' = 'success'): void => {
  const toast = document.getElementById('auth-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.className = 'auth-toast';
  toast.classList.add(`toast-${type}`);

  const icon = toast.querySelector('i');
  if (icon) {
    icon.className = type === 'success'
      ? 'fa-solid fa-circle-check'
      : 'fa-solid fa-circle-xmark';
  }

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4000);
};

// =========================================
// 3. FUNCIONES DE API
// =========================================

interface LoginResponse {
  mensaje: string;
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };
}

interface RegisterResponse {
  mensaje: string;
  id?: number;
}

const sendLoginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al iniciar sesión');
  }

  return data;
};

const sendRegisterRequest = async (nombre: string, email: string, password: string): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en registro');
  }

  return data;
};

// =========================================
// 4. HANDLERS DE FORMULARIO
// =========================================

const handleLogin = async (event: Event): Promise<void> => {
  event.preventDefault();

  const emailInput = document.getElementById('login-email') as HTMLInputElement | null;
  const passwordInput = document.getElementById('login-password') as HTMLInputElement | null;
  const submitBtn = document.getElementById('btn-login') as HTMLButtonElement | null;

  if (!emailInput || !passwordInput || !submitBtn) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let isValid = true;

  if (!validateEmail(email)) {
    setFieldError('field-email', true);
    isValid = false;
  } else {
    setFieldError('field-email', false);
  }

  if (!validatePassword(password)) {
    setFieldError('field-password', true);
    isValid = false;
  } else {
    setFieldError('field-password', false);
  }

  if (!isValid) return;

  setLoadingState(submitBtn, true);

  try {
    const data = await sendLoginRequest(email, password);

    // Guardar datos en localStorage
    localStorage.setItem('usuarioActual', data.usuario.nombre);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    localStorage.setItem('mr_auth_token', 'session_active');

    showToast('¡Sesión iniciada correctamente!', 'success');

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 1500);
  } catch (error: any) {
    showToast(error.message || 'Error al iniciar sesión', 'error');
  } finally {
    setLoadingState(submitBtn, false);
  }
};

const handleRegister = async (event: Event): Promise<void> => {
  event.preventDefault();

  const nameInput = document.getElementById('register-name') as HTMLInputElement | null;
  const emailInput = document.getElementById('register-email') as HTMLInputElement | null;
  const passwordInput = document.getElementById('register-password') as HTMLInputElement | null;
  const confirmInput = document.getElementById('register-confirm') as HTMLInputElement | null;
  const submitBtn = document.getElementById('btn-register') as HTMLButtonElement | null;

  if (!nameInput || !emailInput || !passwordInput || !confirmInput || !submitBtn) return;

  const nombre = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  let isValid = true;

  if (!validateName(nombre)) {
    setFieldError('field-name', true);
    isValid = false;
  } else {
    setFieldError('field-name', false);
  }

  if (!validateEmail(email)) {
    setFieldError('field-email', true);
    isValid = false;
  } else {
    setFieldError('field-email', false);
  }

  if (!validatePassword(password)) {
    setFieldError('field-password', true);
    isValid = false;
  } else {
    setFieldError('field-password', false);
  }

  if (password !== confirm) {
    setFieldError('field-confirm', true);
    isValid = false;
  } else if (confirm.length > 0) {
    setFieldError('field-confirm', false);
  }

  if (!isValid) return;

  setLoadingState(submitBtn, true);

  try {
    await sendRegisterRequest(nombre, email, password);
    showToast('¡Cuenta creada exitosamente! Redirigiendo...', 'success');

    setTimeout(() => {
      window.location.href = '/login.html';
    }, 2000);
  } catch (error: any) {
    showToast(error.message || 'Error al registrar el usuario', 'error');
  } finally {
    setLoadingState(submitBtn, false);
  }
};

// =========================================
// 5. INICIALIZACIÓN
// =========================================

const initTogglePassword = (): void => {
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const field = btn.closest('.auth-field');
      const input = field?.querySelector('input');
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });
};

const initRealTimeValidation = (): void => {
  const loginEmail = document.getElementById('login-email') as HTMLInputElement | null;
  const loginPassword = document.getElementById('login-password') as HTMLInputElement | null;

  if (loginEmail) {
    loginEmail.addEventListener('blur', () => {
      const val = loginEmail.value.trim();
      if (val.length > 0) {
        setFieldError('field-email', !validateEmail(val));
      }
    });
    loginEmail.addEventListener('input', () => clearFieldState('field-email'));
  }

  if (loginPassword) {
    loginPassword.addEventListener('blur', () => {
      const val = loginPassword.value;
      if (val.length > 0) {
        setFieldError('field-password', !validatePassword(val));
      }
    });
    loginPassword.addEventListener('input', () => clearFieldState('field-password'));
  }

  const regName = document.getElementById('register-name') as HTMLInputElement | null;
  const regEmail = document.getElementById('register-email') as HTMLInputElement | null;
  const regPassword = document.getElementById('register-password') as HTMLInputElement | null;
  const regConfirm = document.getElementById('register-confirm') as HTMLInputElement | null;

  if (regName) {
    regName.addEventListener('blur', () => {
      const val = regName.value.trim();
      if (val.length > 0) {
        setFieldError('field-name', !validateName(val));
      }
    });
    regName.addEventListener('input', () => clearFieldState('field-name'));
  }

  if (regEmail) {
    regEmail.addEventListener('blur', () => {
      const val = regEmail.value.trim();
      if (val.length > 0) {
        setFieldError('field-email', !validateEmail(val));
      }
    });
    regEmail.addEventListener('input', () => clearFieldState('field-email'));
  }

  if (regPassword) {
    regPassword.addEventListener('input', () => {
      clearFieldState('field-password');
      const val = regPassword.value;
      const strengthEl = document.getElementById('password-strength');
      const strengthText = document.getElementById('strength-text');

      if (strengthEl && strengthText) {
        const level = getPasswordStrength(val);
        strengthEl.className = 'password-strength';
        if (val.length > 0) {
          strengthEl.classList.add(`strength-${level}`);
          strengthText.textContent = STRENGTH_LABELS[level] || '';
        } else {
          strengthText.textContent = '';
        }
      }
    });

    regPassword.addEventListener('blur', () => {
      const val = regPassword.value;
      if (val.length > 0) {
        setFieldError('field-password', !validatePassword(val));
      }
    });
  }

  if (regConfirm) {
    regConfirm.addEventListener('blur', () => {
      const val = regConfirm.value;
      const pw = regPassword?.value || '';
      if (val.length > 0) {
        setFieldError('field-confirm', val !== pw);
      }
    });
    regConfirm.addEventListener('input', () => clearFieldState('field-confirm'));
  }
};

const updateHeaderSession = (): void => {
  const usuarioLogueado = localStorage.getItem('usuarioActual');
  const accountActions = document.querySelector('.account-actions');

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

    const btnHeaderCerrar = document.getElementById('btnHeaderCerrar');
    if (btnHeaderCerrar) {
      btnHeaderCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
          localStorage.removeItem('usuarioActual');
          localStorage.removeItem('usuario');
          localStorage.removeItem('mr_auth_token');
          alert('Sesión cerrada correctamente.');
          window.location.reload();
        }
      });
    }
  }
};

const init = (): void => {
  initTogglePassword();
  initRealTimeValidation();
  updateHeaderSession();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
};

document.addEventListener('DOMContentLoaded', init);
export {};
