/**
 * ================================================================
 * auth.js — Módulo de Autenticación MuscleRice
 * ================================================================
 * 
 * Arquitectura:  Modular ES6 con Event Delegation
 * Principios:    SRP (cada función hace UNA cosa), DRY, Clean Code
 * 
 * FUNCIONES CLAVE EXPLICADAS:
 * 
 * 1. validateEmail(email)
 *    → Usa una expresión regular (regex) RFC 5322 simplificada
 *      para verificar que el string tenga formato de correo válido.
 *      Retorna true/false. Se ejecuta en blur y en submit.
 * 
 * 2. validatePassword(password)
 *    → Verifica longitud mínima de 6 caracteres.
 *      Retorna true/false. Se usa en login y registro.
 * 
 * 3. getPasswordStrength(password)
 *    → Calcula la "fuerza" de la contraseña de 0 a 4 analizando:
 *      longitud, si tiene mayúsculas, números y caracteres especiales.
 *      Retorna un número (0-4) que activa las barras visuales.
 * 
 * 4. setFieldError(fieldId, show)
 *    → Función centralizada para mostrar/ocultar errores en los inputs.
 *      Agrega la clase .has-error (borde rojo + shake) o .is-valid
 *      (borde verde). Principio DRY: UN solo lugar para manejar estados.
 * 
 * 5. setLoadingState(button, isLoading)
 *    → Controla el estado del botón: deshabilita, muestra spinner y texto
 *      de "Verificando...". Evita doble click que satura al servidor.
 * 
 * 6. showToast(message, type)
 *    → Muestra una notificación flotante (toast) que aparece desde la
 *      derecha con animación "spring". Se auto-oculta a los 4 segundos.
 * 
 * 7. simulateLoginRequest(email, password)
 *    → Función async/await que simula un fetch() al backend con un
 *      setTimeout de 2 segundos. Cuando conectes el backend real,
 *      solo cambias esta función por un fetch() real.
 * 
 * 8. handleLogin(event)
 *    → Orquesta todo el flujo de login: valida campos → activa loading
 *      → llama al API simulado → guarda token en localStorage → redirige.
 * 
 * 9. handleRegister(event)
 *    → Orquesta el flujo de registro: valida 4 campos → verifica que
 *      las contraseñas coincidan → llama al API → redirige a login.
 * 
 * 10. initTogglePassword()
 *     → Busca todos los botones con clase .toggle-password y les agrega
 *       un event listener que cambia el type del input entre "password"
 *       y "text" para mostrar/ocultar la contraseña de forma segura.
 * 
 * ================================================================
 */

// =========================================
// 1. VALIDADORES PUROS (sin side effects)
// =========================================

/**
 * Valida formato de correo electrónico.
 * Regex: nombre@dominio.extensión
 * @param {string} email - Correo a validar
 * @returns {boolean}
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida longitud mínima de contraseña (6 caracteres).
 * @param {string} password
 * @returns {boolean}
 */
const validatePassword = (password) => {
  return password.length >= 6;
};

/**
 * Valida nombre: al menos 3 caracteres no vacíos.
 * @param {string} name
 * @returns {boolean}
 */
const validateName = (name) => {
  return name.trim().length >= 3;
};

/**
 * Calcula la fuerza de una contraseña en escala 0-4.
 * 
 * Criterios evaluados:
 * - Longitud >= 6 → +1 punto
 * - Contiene mayúscula → +1 punto
 * - Contiene número → +1 punto
 * - Contiene caracter especial → +1 punto
 * 
 * @param {string} password
 * @returns {number} 0 a 4
 */
const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

/** Textos descriptivos para cada nivel de fuerza */
const STRENGTH_LABELS = ['', 'Débil', 'Regular', 'Buena', 'Fuerte 💪'];

// =========================================
// 2. FUNCIONES DE UI (manipulan el DOM)
// =========================================

/**
 * Muestra u oculta el estado de error/válido de un campo.
 * 
 * CÓMO FUNCIONA:
 * 1. Busca el div contenedor (.auth-field) por su ID
 * 2. Si show=true → agrega .has-error + animación .shake
 * 3. Si show=false → agrega .is-valid (borde verde)
 * 4. El shake se remueve después de 500ms para poder re-dispararlo
 * 
 * @param {string} fieldId - ID del div contenedor (ej: 'field-email')
 * @param {boolean} show - true=error, false=válido
 */
const setFieldError = (fieldId, show) => {
  const field = document.getElementById(fieldId);
  if (!field) return;

  if (show) {
    field.classList.add('has-error');
    field.classList.remove('is-valid');
    // Dispara la animación de sacudida (shake)
    field.querySelector('input')?.classList.add('shake');
    setTimeout(() => {
      field.querySelector('input')?.classList.remove('shake');
    }, 500);
  } else {
    field.classList.remove('has-error');
    field.classList.add('is-valid');
  }
};

/**
 * Limpia todos los estados visuales de un campo.
 * Se usa al empezar a escribir (evento 'input').
 */
const clearFieldState = (fieldId) => {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.remove('has-error', 'is-valid');
};

/**
 * Controla el estado de carga del botón de submit.
 * 
 * CÓMO FUNCIONA:
 * 1. Deshabilita el botón (disabled=true) para evitar múltiples clics
 * 2. Agrega la clase .is-loading que:
 *    - Oculta el texto original (.btn-text)
 *    - Muestra el spinner (.btn-spinner) + texto de carga
 * 3. Cuando isLoading=false, restaura todo al estado original
 * 
 * @param {HTMLButtonElement} button
 * @param {boolean} isLoading
 */
const setLoadingState = (button, isLoading) => {
  if (!button) return;
  button.disabled = isLoading;
  if (isLoading) {
    button.classList.add('is-loading');
  } else {
    button.classList.remove('is-loading');
  }
};

/**
 * Muestra una notificación "toast" flotante.
 * 
 * CÓMO FUNCIONA:
 * 1. Actualiza el texto y el icono según el tipo (success/error)
 * 2. Agrega .is-visible que la desliza desde fuera de la pantalla
 * 3. Después de 4 segundos, la vuelve a ocultar automáticamente
 * 
 * @param {string} message - Texto a mostrar
 * @param {'success'|'error'} type - Tipo de notificación
 */
const showToast = (message, type = 'success') => {
  const toast = document.getElementById('auth-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  // Actualizar contenido
  toastMsg.textContent = message;
  toast.className = 'auth-toast'; // Reset clases
  toast.classList.add(`toast-${type}`);

  // Cambiar icono según tipo
  const icon = toast.querySelector('i');
  if (icon) {
    icon.className = type === 'success'
      ? 'fa-solid fa-circle-check'
      : 'fa-solid fa-circle-xmark';
  }

  // Animar entrada
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  // Auto-ocultar después de 4 segundos
  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4000);
};

// =========================================
// 3. FUNCIONES DE API (async/await)
// =========================================

/**
 * Simula una petición de login al backend.
 * 
 * CÓMO FUNCIONA:
 * - Usa un Promise con setTimeout para simular latencia de red (2s)
 * - Retorna un objeto con token ficticio y datos del usuario
 * - CUANDO CONECTES EL BACKEND REAL, reemplaza el contenido de esta
 *   función por un fetch() al endpoint: POST /api/auth/login
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, token: string, user: object}>}
 */
const simulateLoginRequest = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: 'mr_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        user: {
          id: 1,
          email: email,
          nombre: 'Usuario MuscleRice',
          role: 'cliente'
        }
      });
    }, 2000); // 2 segundos de simulación
  });
};

/**
 * Simula una petición de registro al backend.
 * Similar a simulateLoginRequest pero para crear cuenta.
 * 
 * REEMPLAZO FUTURO: POST /api/auth/register
 * 
 * @param {string} nombre
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message: string}>}
 */
const simulateRegisterRequest = async (nombre, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '¡Cuenta creada exitosamente!'
      });
    }, 2000);
  });
};

// =========================================
// 4. HANDLERS DE FORMULARIO
// =========================================

/**
 * HANDLER: Formulario de Login
 * 
 * FLUJO COMPLETO:
 * 1. Previene el submit nativo del formulario
 * 2. Lee los valores de email y password
 * 3. Valida cada campo (muestra errores si falla)
 * 4. Si todo es válido → activa estado de carga del botón
 * 5. Llama al API simulado (await)
 * 6. Si éxito → guarda token + datos en localStorage → redirige
 * 7. Si error → muestra toast de error
 * 8. Siempre desactiva el loading al final (finally)
 */
const handleLogin = async (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('btn-login');

  if (!emailInput || !passwordInput || !submitBtn) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // --- Validar campos ---
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

  // --- Activar loading ---
  setLoadingState(submitBtn, true);

  try {
    // --- Llamar al API (simulado) ---
    const response = await simulateLoginRequest(email, password);

    if (response.success) {
      // Guardar sesión en localStorage (persistencia segura)
      localStorage.setItem('mr_auth_token', response.token);
      localStorage.setItem('mr_user', JSON.stringify(response.user));
      localStorage.setItem('mr_logged_in', 'true');

      // Toast de éxito
      showToast('¡Sesión iniciada correctamente!', 'success');

      // Redirigir al inicio después de 1.5 segundos
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 1500);
    }
  } catch (error) {
    showToast('Error de conexión. Intenta de nuevo.', 'error');
  } finally {
    setLoadingState(submitBtn, false);
  }
};

/**
 * HANDLER: Formulario de Registro
 * 
 * FLUJO:
 * 1. Valida los 4 campos (nombre, email, password, confirmación)
 * 2. Verifica que las contraseñas coincidan
 * 3. Llama al API simulado
 * 4. Si éxito → muestra toast + redirige a login
 */
const handleRegister = async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm');
  const submitBtn = document.getElementById('btn-register');

  if (!nameInput || !emailInput || !passwordInput || !confirmInput || !submitBtn) return;

  const nombre = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  // --- Validar todos los campos ---
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

  // Verificar que las contraseñas coincidan
  if (password !== confirm) {
    setFieldError('field-confirm', true);
    isValid = false;
  } else if (confirm.length > 0) {
    setFieldError('field-confirm', false);
  }

  if (!isValid) return;

  // --- Activar loading ---
  setLoadingState(submitBtn, true);

  try {
    const response = await simulateRegisterRequest(nombre, email, password);

    if (response.success) {
      showToast('¡Cuenta creada exitosamente! Redirigiendo...', 'success');

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    }
  } catch (error) {
    showToast('Error al crear la cuenta. Intenta de nuevo.', 'error');
  } finally {
    setLoadingState(submitBtn, false);
  }
};

// =========================================
// 5. INICIALIZACIÓN (Event Listeners)
// =========================================

/**
 * Inicializa los botones de mostrar/ocultar contraseña.
 * 
 * CÓMO FUNCIONA:
 * 1. Busca todos los botones con clase .toggle-password
 * 2. Para cada uno, busca el input hermano anterior
 * 3. Al hacer click, cambia el type entre 'password' y 'text'
 * 4. Los iconos se manejan con CSS puro (fa-eye / fa-eye-slash)
 */
const initTogglePassword = () => {
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      // El input es el primer hijo del mismo .auth-field
      const field = btn.closest('.auth-field');
      const input = field?.querySelector('input');
      if (!input) return;

      // Alternar tipo
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      // Actualizar aria-label para accesibilidad
      btn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });
};

/**
 * Inicializa validación en tiempo real (blur + input events).
 * 
 * CÓMO FUNCIONA:
 * - blur: cuando el usuario sale del input, valida el campo y muestra
 *   error o estado válido inmediatamente.
 * - input: mientras escribe, limpia el estado de error para que no
 *   se quede "rojo" mientras corrige.
 */
const initRealTimeValidation = () => {
  // --- Login: validación en blur ---
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

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

  // --- Registro: validación en blur + indicador de fuerza ---
  const regName = document.getElementById('register-name');
  const regEmail = document.getElementById('register-email');
  const regPassword = document.getElementById('register-password');
  const regConfirm = document.getElementById('register-confirm');

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
    // Actualizar indicador de fuerza mientras escribe
    regPassword.addEventListener('input', () => {
      clearFieldState('field-password');
      const val = regPassword.value;
      const strengthEl = document.getElementById('password-strength');
      const strengthText = document.getElementById('strength-text');

      if (strengthEl && strengthText) {
        const level = getPasswordStrength(val);
        // Reset todas las clases de fuerza
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

/**
 * PUNTO DE ENTRADA PRINCIPAL
 * 
 * Se ejecuta cuando el DOM está listo.
 * Detecta en qué página estamos (login o registro) y
 * conecta el handler correspondiente al formulario.
 */
const init = () => {
  // Toggle de contraseña (aplica en ambas páginas)
  initTogglePassword();

  // Validación en tiempo real
  initRealTimeValidation();

  // Conectar formulario de login (si existe en esta página)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Conectar formulario de registro (si existe en esta página)
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
