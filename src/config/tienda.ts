// ─────────────────────────────────────────────────────────────────────────────
// Datos de la tienda — ÚNICA fuente de verdad
//
// Header, Footer y Contacto leen de aquí. Para cambiar un teléfono o un correo
// se edita SOLO este archivo y se actualiza en todo el sitio.
//
// ⚠️ DATOS PROVISIONALES: reemplazar por los reales cuando estén disponibles.
// ─────────────────────────────────────────────────────────────────────────────

export const TIENDA = {
  nombre: 'MuscleRice',

  // WhatsApp en formato internacional: 57 (Colombia) + número, sin "+" ni espacios
  whatsapp: '573124567890',
  telefonoVisible: '+57 312 456 7890',

  email: 'MuscleRice@gmail.com',

  ciudad: 'Tunja, Boyacá',
  direccion: 'Tunja, Boyacá, Colombia',
  horario: 'Lunes a sábado · 8:00 a.m. – 6:00 p.m.',

  // Dejar vacío ('') las redes que no existan: no se mostrarán
  redes: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
};

// Arma el enlace de WhatsApp con un mensaje ya escrito
export function whatsappUrl(mensaje = ''): string {
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${TIENDA.whatsapp}${texto}`;
}

// Redes con enlace (las vacías se filtran) + su ícono de Font Awesome 4.7
export const REDES_ACTIVAS = [
  { nombre: 'Instagram', url: TIENDA.redes.instagram, icono: 'fa-instagram' },
  { nombre: 'Facebook', url: TIENDA.redes.facebook, icono: 'fa-facebook' },
  // Font Awesome 4.7 no tiene ícono de TikTok; se usa uno genérico
  { nombre: 'TikTok', url: TIENDA.redes.tiktok, icono: 'fa-music' },
].filter((red) => red.url !== '');
