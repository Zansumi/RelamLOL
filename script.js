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
  }
};

/* ==========================================================
   UTILIDADES
   ========================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, props = {}, html = "") => {
  const n = Object.assign(document.createElement(tag), props);
  if (html) n.innerHTML = html;
  return n;
};
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ==========================================================
   PANTALLAS: una por vez, con transición direccional
   ========================================================== */
const screens = $$(".screen");
const ids = screens.map(s => s.id);
const menu = $("#menu");
const menuBtn = $("#menuBtn");
const navLinks = $$("a", menu);
const dots = $("#dots");
let current = -1;

// retraso escalonado de la animación de entrada
screens.forEach(s => $$(".rv", s).forEach((n, i) => n.style.setProperty("--i", Math.min(i, 10))));

ids.forEach((id, i) => {
  const d = el("button", { type: "button", ariaLabel: `Ir a ${id}` });
  d.addEventListener("click", () => go(id));
  dots.append(d);
});

function go(id, push = true) {
  const next = ids.indexOf(id);
  if (next < 0 || next === current) return;
  current = next;
  screens.forEach((s, i) => {
    s.style.setProperty("--s", Math.sign(i - next));
    s.classList.toggle("active", i === next);
    s.toggleAttribute("inert", i !== next);
  });
  screens[next].scrollTop = 0;
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  $$("button", dots).forEach((d, i) => d.classList.toggle("on", i === next));
  document.title = `${id[0].toUpperCase() + id.slice(1)} | RelamLoL SPÑ VR`;
  if (push) history.pushState(null, "", `#${id}`);
  setMenu(false);
}

const step = d => go(ids[(current + d + ids.length) % ids.length]);
$("#prev").addEventListener("click", () => step(-1));
$("#next").addEventListener("click", () => step(1));

// cualquier enlace interno (#algo) cambia de pantalla
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  go(a.getAttribute("href").slice(1));
});
window.addEventListener("popstate", () => go(location.hash.slice(1) || "inicio", false));

// teclado (flechas) y deslizar en móvil
document.addEventListener("keydown", e => {
  if (!lb.hidden || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});
let tx = 0, ty = 0;
$("#stage").addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
$("#stage").addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) step(dx < 0 ? 1 : -1);
}, { passive: true });

// menú móvil
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
}
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));

/* ==========================================================
   LIGHTBOX
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
  $("#lbClose").focus();
}
function lbClose() { lb.hidden = true; lbOpener?.focus(); }
function lbStep(d) { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; lbShow(); }
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
const itemsDe = cat => cat === "Todos" ? Object.values(PORTAFOLIO).flat() : PORTAFOLIO[cat];

function renderGaleria(cat) {
  const items = itemsDe(cat);
  gallery.replaceChildren();
  items.forEach(([src, desc, cliente], i) => {
    const card = el("article", { className: "card rv" });
    card.style.setProperty("--i", Math.min(i, 10));
    const btn = el("button", { type: "button", ariaLabel: `Ampliar: ${desc} de ${cliente}` });
    btn.append(el("img", { src, alt: `${desc} para ${cliente}`, loading: "lazy", decoding: "async" }));
    btn.addEventListener("click", () => lbOpen(items, i));
    card.append(btn, el("div", { className: "card-info" }, `<strong>${esc(desc)}</strong><span>${esc(cliente)}</span>`));
    gallery.append(card);
  });
}

["Todos", ...Object.keys(PORTAFOLIO)].forEach(cat => {
  const chip = el("button", { type: "button", className: "chip", textContent: cat });
  chip.setAttribute("aria-pressed", cat === "Todos");
  chip.addEventListener("click", () => {
    $$(".chip", filters).forEach(c => c.setAttribute("aria-pressed", c === chip));
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
  $$(".tab", tabs).forEach(t => t.setAttribute("aria-selected", t.dataset.tab === nombre));
  panel.innerHTML = `<h3>${nombre}</h3>` + s.planes.map(([t, p, d]) =>
    `<div class="plan"><div><h4>${t}</h4><p>${d}</p></div><span class="price">${p}</span></div>`).join("");
  preview.replaceChildren();
  const muestras = PORTAFOLIO[s.muestra].slice(0, 6);
  muestras.forEach(([src, desc, cliente], i) => {
    const img = el("img", { src, alt: `${desc} para ${cliente}`, loading: "lazy", tabIndex: 0 });
    img.style.animationDelay = `${i * 70}ms`;
    img.addEventListener("click", () => lbOpen(muestras, i));
    img.addEventListener("keydown", e => { if (e.key === "Enter") lbOpen(muestras, i); });
    preview.append(img);
  });
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
   COPIAR (correo y Discord)
   ========================================================== */
const toast = $("#toast");
let toastTimer;
async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    const t = el("textarea", { value: texto });
    t.style.cssText = "position:fixed;opacity:0";
    document.body.append(t); t.select();
    document.execCommand("copy"); t.remove();
  }
}
$$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
  const texto = b.dataset.copy;
  await copiar(texto);
  const tag = $("em", b);
  tag.textContent = "¡Copiado!"; tag.classList.add("ok");
  toast.textContent = `Copiado: ${texto}`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    tag.textContent = "Copiar"; tag.classList.remove("ok");
  }, 2000);
}));

/* ==========================================================
   FONDO: partículas flotantes + luz que sigue al cursor
   ========================================================== */
const stars = $("#stars");
for (let i = 0; i < 18; i++) {
  const s = el("i");
  const size = 4 + Math.random() * 8;
  s.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${14 + Math.random() * 16}s;animation-delay:-${Math.random() * 20}s`;
  stars.append(s);
}
window.addEventListener("pointermove", e => {
  const g = $("#glow").style;
  g.setProperty("--mx", e.clientX + "px");
  g.setProperty("--my", e.clientY + "px");
}, { passive: true });

/* ==========================================================
   INICIO
   ========================================================== */
go(ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : "inicio", false);
