"use strict";

/* ==========================================================
   DATOS  (para agregar un trabajo, añade una línea aquí)
   formato: [ruta, descripción, cliente]
   ========================================================== */
const PORTAFOLIO = {
  Miniaturas: [
    ["assets/miniaturas/bandejitamini.png", "Miniatura para YouTube", "Bandejitapaisa"],
    ["assets/miniaturas/juliiomini.png", "Miniatura para evento", "Juliokingdom"],
    ["assets/miniaturas/marcoplaysmini.png", "Miniatura para evento", "ElMarcoPlays"],
    ["assets/miniaturas/examplemini.png", "Miniatura para evento", "Example Client"],
    ["assets/miniaturas/miniatura21.png", "Miniatura para evento", "Example Client"]
  ],
  Confirmaciones: [
    ["assets/confirmaciones/confirmaciones otterstudio.png", "Confirmación de evento", "OtterStudio"],
    ["assets/confirmaciones/confirmaciones otterstudio 2.png", "Confirmación de evento", "OtterStudio"],
    ["assets/confirmaciones/confirmaciones otterstudio 3.png", "Confirmación de evento", "OtterStudio"],
    ["assets/confirmaciones/confirmacionesespermadeath2 1.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesespermadeath2 2.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesespermadeath2 3.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesespermadeath2 4.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesespermadeath2 5.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesespermadeath2 6.png", "Confirmación de evento", "ES Permadeath 2"],
    ["assets/confirmaciones/confirmacionesnovaterra1.png", "Confirmación de evento", "Nova Terra MC"],
    ["assets/confirmaciones/confirmacionesnovaterra2.png", "Confirmación de evento", "Nova Terra MC"],
    ["assets/confirmaciones/confirmacionesnovaterra3.png", "Confirmación de evento", "Nova Terra MC"]
  ],
  Ganadores: [
    ["assets/ganadores/ganador1experimentoluminated.png", "Ganador del concurso", "Experimento Luminated"],
    ["assets/ganadores/ganador2experimentoluminated.png", "Ganador del concurso", "Experimento Luminated"],
    ["assets/ganadores/ganador1skibidicum.png", "Ganador del concurso", "SkibidiCumple"],
    ["assets/ganadores/ganador2skibidicum.png", "Ganador del concurso", "SkibidiCumple"],
    ["assets/ganadores/ganador3skibidicum.png", "Ganador del concurso", "SkibidiCumple"],
    ["assets/ganadores/ganador1sunset games remake Lucsggez.png", "Ganador del concurso", "Sunset Games Remake Lucsggez"],
    ["assets/ganadores/ganador1watergames Neobraks.png", "Ganador del concurso", "Water Games Neobraks"]
  ],
  Flyers: [
    ["assets/flyer/flyerisla de la traicion.png", "Flyer anunciativo", "Isla de la Traición"],
    ["assets/flyer/flyerl.a.t.d v1.png", "Flyer anunciativo", "L.A.T.D v1"],
    ["assets/flyer/flyerl.a.t.d v2.png", "Flyer anunciativo", "L.A.T.D v2"],
    ["assets/flyer/flyerl.a.t.d v3.png", "Flyer anunciativo", "L.A.T.D v3"],
    ["assets/flyer/flyersociety virtual valley.png", "Flyer anunciativo", "Society Virtual Valley"]
  ],
  Banners: [
    ["assets/baners/banercloud_1667.png", "Banner para red social", "Cloud_1667"],
    ["assets/baners/banerrelamx.png", "Banner para red social", "RelamMC"],
    ["assets/baners/banertalo2203x.png", "Banner para red social", "Talo2203"],
    ["assets/baners/banertredingccx.png", "Banner para red social", "Tredingcc"]
  ],
  Iconos: [
    ["assets/iconos/elpapapum01.png", "Icono de perfil", "Elpapapum01"],
    ["assets/iconos/icono by_capy.png", "Icono de perfil", "by_capy"],
    ["assets/iconos/icono talo2203.png", "Icono de perfil", "Talo2203"]
  ]
};

const SERVICIOS = {
  Miniaturas: {
    muestra: "Miniaturas",
    planes: [
      ["Sencillo", "$5 USD", "Render simple con iluminación y fondo básico."],
      ["Con PNGs", "$10 USD", "Más detalles, iluminación mejorada y composición elaborada."],
      ["Full detalles", "$15 USD", "Render complejo con personalización avanzada."]
    ]
  },
  Confirmaciones: {
    muestra: "Confirmaciones",
    planes: [
      ["Sencilla", "$5 USD", "Paquete de 5 confirmaciones."],
      ["Poco compleja", "$10 USD", "Paquete de 5 confirmaciones con mayor detalle."],
      ["Compleja", "$15 USD", "Paquete de 3 confirmaciones premium."]
    ]
  },
  Otros: {
    muestra: "Flyers",
    planes: [
      ["Flyers", "$5 – $15 USD", "Diseños anunciativos para tu evento o servidor."],
      ["Renders de ganador", "$5 – $10 USD", "Render para destacar a los ganadores."],
      ["Iconos de perfil", "$3 – $10 USD", "Icono personalizado para tus redes."]
    ]
  },
  Importante: {
    muestra: null,
    terminos: [
      "<strong>Pagos:</strong> solo acepto PayPal y Ko-fi.",
      "Me reservo el derecho de cancelar o rechazar cualquier proyecto con el que no me sienta cómodo trabajando.",
      "Puedes pedir hasta 3 pruebas o revisiones sin costo. Desde la 4.ª se aplica un cargo adicional de $3 USD. El contenido de prueba no puede publicarse bajo ninguna circunstancia.",
      "Me reservo el derecho de publicar mis trabajos de miniaturas y renders en mis redes sociales y en mi portafolio."
    ]
  }
};

/* ==========================================================
   UTILIDADES
   ========================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const el = (tag, props = {}, html = "") => {
  const n = Object.assign(document.createElement(tag), props);
  if (html) n.innerHTML = html;
  return n;
};
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ==========================================================
   LIGHTBOX (con navegación anterior / siguiente)
   ========================================================== */
const lb = $("#lightbox");
let lbItems = [], lbIndex = 0, lbOpener = null;

function lbShow() {
  const [src, desc, cliente] = lbItems[lbIndex];
  $("#lbImg").src = src;
  $("#lbImg").alt = `${desc} para ${cliente}`;
  $("#lbCap").textContent = `${desc} · ${cliente}`;
}
function lbOpen(items, i) {
  lbItems = items; lbIndex = i; lbOpener = document.activeElement;
  lbShow(); lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
}
function lbClose() {
  lb.hidden = true;
  document.body.style.overflow = "";
  lbOpener?.focus();
}
function lbStep(d) {
  lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
  lbShow();
}
$("#lbClose").addEventListener("click", lbClose);
$("#lbPrev").addEventListener("click", () => lbStep(-1));
$("#lbNext").addEventListener("click", () => lbStep(1));
lb.addEventListener("click", e => { if (e.target === lb) lbClose(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lbClose();
  if (e.key === "ArrowLeft") lbStep(-1);
  if (e.key === "ArrowRight") lbStep(1);
});

/* ==========================================================
   PORTAFOLIO: filtros + galería
   ========================================================== */
const gallery = $("#gallery");
const filters = $("#filters");
const categorias = ["Todos", ...Object.keys(PORTAFOLIO)];

function itemsDe(cat) {
  return cat === "Todos" ? Object.values(PORTAFOLIO).flat() : PORTAFOLIO[cat];
}

function renderGaleria(cat) {
  const items = itemsDe(cat);
  gallery.replaceChildren();
  if (!items.length) {
    gallery.append(el("p", { className: "empty" }, "Todavía no hay trabajos en esta categoría."));
    return;
  }
  items.forEach(([src, desc, cliente], i) => {
    const card = el("article", { className: "card" });
    const btn = el("button", { type: "button", ariaLabel: `Ampliar: ${desc} de ${cliente}` });
    btn.append(el("img", { src, alt: `${desc} para ${cliente}`, loading: "lazy", decoding: "async" }));
    btn.addEventListener("click", () => lbOpen(items, i));
    card.append(btn, el("div", { className: "card-info" }, `<strong>${esc(desc)}</strong><span>${esc(cliente)}</span>`));
    gallery.append(card);
  });
}

categorias.forEach(cat => {
  const chip = el("button", { type: "button", className: "chip", textContent: cat });
  chip.setAttribute("aria-pressed", cat === "Todos");
  chip.addEventListener("click", () => {
    filters.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
    renderGaleria(cat);
  });
  filters.append(chip);
});
renderGaleria("Todos");

/* ==========================================================
   SERVICIOS: pestañas
   ========================================================== */
const tabs = $("#tabs");
const panel = $("#servicePanel");
const preview = $("#servicePreview");

function mostrarServicio(nombre) {
  const s = SERVICIOS[nombre];
  tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.tab === nombre));

  panel.innerHTML = s.planes
    ? `<h3>${nombre}</h3>` + s.planes.map(([t, p, d]) =>
        `<div class="plan"><div><h4>${t}</h4><p>${d}</p></div><span class="price">${p}</span></div>`).join("")
    : `<h3>Términos y pagos</h3><ul class="terms">${s.terminos.map(t => `<li>${t}</li>`).join("")}</ul>`;

  preview.replaceChildren();
  preview.hidden = !s.muestra;
  if (s.muestra) {
    const muestras = PORTAFOLIO[s.muestra].slice(0, 6);
    muestras.forEach(([src, desc, cliente], i) => {
      const img = el("img", { src, alt: `${desc} para ${cliente}`, loading: "lazy", tabIndex: 0 });
      img.addEventListener("click", () => lbOpen(muestras, i));
      img.addEventListener("keydown", e => { if (e.key === "Enter") lbOpen(muestras, i); });
      preview.append(img);
    });
  }
}

Object.keys(SERVICIOS).forEach(nombre => {
  const t = el("button", { type: "button", className: "tab", textContent: nombre });
  t.dataset.tab = nombre;
  t.setAttribute("role", "tab");
  t.addEventListener("click", () => mostrarServicio(nombre));
  tabs.append(t);
});
mostrarServicio("Miniaturas");

/* ==========================================================
   NAVEGACIÓN: menú móvil + enlace activo
   ========================================================== */
const menu = $("#menu");
const menuBtn = $("#menuBtn");
const setMenu = open => {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
};
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });

const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-40% 0px -55% 0px" });

links.forEach(a => {
  const sec = $(a.getAttribute("href"));
  if (sec) spy.observe(sec);
});
