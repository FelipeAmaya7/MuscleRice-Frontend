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

  // ✏️ Solo el celular de 10 dígitos, sin espacios (ej: 3124567890)
  celular: '3124567890',

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

// ─── Todo lo de abajo se calcula solo a partir de los datos de arriba ───

// "3124567890" → "+57 312 456 7890" (para mostrar en pantalla)
const c = TIENDA.celular;
export const TELEFONO_VISIBLE = `+57 ${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6)}`;

// Arma el enlace de WhatsApp (57 = código de Colombia) con un mensaje ya escrito
export function whatsappUrl(mensaje = ''): string {
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/57${TIENDA.celular}${texto}`;
}

// Redes con enlace (las vacías se filtran) + su ícono de Font Awesome 4.7
export const REDES_ACTIVAS = [
  { nombre: 'Instagram', url: TIENDA.redes.instagram, icono: 'fa-instagram' },
  { nombre: 'Facebook', url: TIENDA.redes.facebook, icono: 'fa-facebook' },
  // Font Awesome 4.7 no tiene ícono de TikTok; se usa uno genérico
  { nombre: 'TikTok', url: TIENDA.redes.tiktok, icono: 'fa-music' },
].filter((red) => red.url !== '');
