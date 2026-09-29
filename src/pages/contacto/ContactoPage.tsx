import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TIENDA, whatsappUrl } from '@/config/tienda';
import '@/styles/pages/_contacto.css';

const ASUNTOS = [
  'Asesoría sobre suplementos',
  'Estado de mi pedido',
  'Envíos y devoluciones',
  'Pagos',
  'Otro',
];

interface FormContacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const FORM_VACIO: FormContacto = { nombre: '', email: '', asunto: ASUNTOS[0], mensaje: '' };

function ContactoPage() {
  const [form, setForm] = useState<FormContacto>(FORM_VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof FormContacto, string>>>({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (campo: keyof FormContacto, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const validar = (): boolean => {
    const nuevos: typeof errores = {};
    if (form.nombre.trim().length < 2) nuevos.nombre = 'Escribe tu nombre';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nuevos.email = 'Escribe un correo válido';
    if (form.mensaje.trim().length < 10) nuevos.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres)';
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  // El formulario arma un mensaje y lo abre en WhatsApp.
  // (Cuando exista un endpoint en el backend, aquí se hará un POST.)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validar()) return;

    const texto =
      `Hola ${TIENDA.nombre} 👋\n` +
      `Soy ${form.nombre.trim()} (${form.email.trim()}).\n` +
      `Asunto: ${form.asunto}\n\n` +
      form.mensaje.trim();

    window.open(whatsappUrl(texto), '_blank', 'noopener');
    setEnviado(true);
    setForm(FORM_VACIO);
  };

  const mapaUrl = `https://www.google.com/maps?q=${encodeURIComponent(TIENDA.direccion)}&output=embed`;

  return (
    <main className="ct-page">
      {/* Encabezado */}
      <section className="ct-hero">
        <div className="ct-container">
          <nav className="ct-breadcrumb" aria-label="Migas de pan">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Contacto</span>
          </nav>
          <h1 className="ct-title">Hablemos 💪</h1>
          <p className="ct-subtitle">
            ¿Dudas sobre qué suplemento elegir o sobre tu pedido? Escríbenos y te respondemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="ct-container ct-grid">
        {/* Columna izquierda: canales de contacto */}
        <div className="ct-info">
          <a className="ct-card ct-card--whatsapp" href={whatsappUrl('Hola MuscleRice, necesito ayuda')} target="_blank" rel="noopener noreferrer">
            <span className="ct-card-icon"><i className="fa fa-whatsapp" aria-hidden="true"></i></span>
            <span>
              <strong>WhatsApp</strong>
              <span className="ct-card-value">{TIENDA.telefonoVisible}</span>
              <span className="ct-card-hint">La forma más rápida de hablar con nosotros</span>
            </span>
          </a>

          <a className="ct-card" href={`mailto:${TIENDA.email}`}>
            <span className="ct-card-icon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            <span>
              <strong>Correo</strong>
              <span className="ct-card-value">{TIENDA.email}</span>
            </span>
          </a>

          <div className="ct-card">
            <span className="ct-card-icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
            <span>
              <strong>Ubicación</strong>
              <span className="ct-card-value">{TIENDA.ciudad}</span>
              <span className="ct-card-hint">Envíos a todo Colombia</span>
            </span>
          </div>

          <div className="ct-card">
            <span className="ct-card-icon"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
            <span>
              <strong>Horario de atención</strong>
              <span className="ct-card-value">{TIENDA.horario}</span>
            </span>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="ct-form-card">
          <h2 className="ct-form-title">Envíanos un mensaje</h2>

          {enviado && (
            <p className="ct-success" role="status">
              ✅ ¡Listo! Se abrió WhatsApp con tu mensaje. Solo falta darle <strong>Enviar</strong>.
            </p>
          )}

          <form className="ct-form" noValidate onSubmit={handleSubmit}>
            <div className="ct-field">
              <label htmlFor="ct-nombre">Nombre</label>
              <input
                id="ct-nombre"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                aria-invalid={!!errores.nombre}
              />
              {errores.nombre && <span className="ct-error">{errores.nombre}</span>}
            </div>

            <div className="ct-field">
              <label htmlFor="ct-email">Correo electrónico</label>
              <input
                id="ct-email"
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-invalid={!!errores.email}
              />
              {errores.email && <span className="ct-error">{errores.email}</span>}
            </div>

            <div className="ct-field">
              <label htmlFor="ct-asunto">Asunto</label>
              <select
                id="ct-asunto"
                value={form.asunto}
                onChange={(e) => handleChange('asunto', e.target.value)}
              >
                {ASUNTOS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="ct-field">
              <label htmlFor="ct-mensaje">Mensaje</label>
              <textarea
                id="ct-mensaje"
                rows={5}
                placeholder="¿En qué te podemos ayudar?"
                value={form.mensaje}
                onChange={(e) => handleChange('mensaje', e.target.value)}
                aria-invalid={!!errores.mensaje}
              />
              {errores.mensaje && <span className="ct-error">{errores.mensaje}</span>}
            </div>

            <button type="submit" className="ct-submit">
              <i className="fa fa-whatsapp" aria-hidden="true"></i>
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Mapa */}
      <section className="ct-container ct-map">
        <iframe
          title={`Mapa de ${TIENDA.ciudad}`}
          src={mapaUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

export default ContactoPage;
