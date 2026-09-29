/* ════════════════════════════════════════════════════════════════════════════
   RLR · Secciones de página completa — Ricardo López Reyero
   Cada archivo de herramientas/secciones/ se inserta en la plantilla al compilar.
   Una sección nueva = una línea en SECCIONES (plantilla.html) + un PAGINAS.id aquí.
   ════════════════════════════════════════════════════════════════════════════ */

// piezas comunes de las páginas de documento
const tablaDoc = (cab, filas, cls = []) => `<div class="tabla-envoltura"><table class="tabla-doc"><thead><tr>${cab.map((c, i) => `<th class="${cls[i] || ''}">${c}</th>`).join('')}</tr></thead><tbody>${filas.map(f => `<tr${f.act ? ' class="act"' : ''}>${f.map((c, i) => `<td class="${cls[i] || ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const indiceDoc = items => `<nav class="doc-indice" aria-label="En esta página">${items.map(([id, t]) => `<button data-ancla="${id}">${t}</button>`).join('')}</nav>`;
const h2Doc = (id, sobre, titulo) => `<h2 id="${id}"><small>${sobre}</small>${titulo}</h2>`;
const citaDoc = (t, ambar) => `<div class="cita${ambar ? ' ambar' : ''}">${t}</div>`;
const tarjeta = (titulo, que, porque) => `<div class="dcard"><h4>${titulo}</h4>${que ? `<div class="que">${que}</div>` : ''}${porque ? `<div class="porque">${porque}</div>` : ''}</div>`;
const heroDoc = (frase, texto) => `<div class="doc-hero"><div class="frase">${frase}</div>${texto ? `<p>${texto}</p>` : ''}</div>`;
const COMPRA = '<span class="chip-c compra">Compra</span>', RENTA = '<span class="chip-c renta">Renta</span>', SUBC = '<span class="chip-c sub">Subcontrato</span>';
const MIXTO = '<span class="chip-c compra">12 propios</span> <span class="chip-c sub">resto subcontratado</span>';

// diagrama tipo Gantt: filas [etiqueta, subetiqueta, [[inicio, fin, texto, color], …]] sobre un eje [min, max]
function ganttDoc(filas, eje, marcas = [], fmtEje = x => x) {
  const [a, b] = eje, pos = x => ((x - a) / (b - a) * 100).toFixed(2) + '%';
  return `<div class="gantt">${filas.map(([t, s, segs]) => `<div class="g-fila"><b>${t}${s ? `<span>${s}</span>` : ''}</b><div class="g-pista">${segs.map(([i, f, txt, col]) =>
    `<div class="g-seg" style="left:${pos(i)};width:calc(${pos(f)} - ${pos(i)});background:${col || 'var(--green)'}" title="${txt || ''}">${txt || ''}</div>`).join('')}</div></div>`).join('')}
    <div class="g-eje"><div></div><div>${marcas.map(x => `<span style="left:${pos(x)}">${fmtEje(x)}</span>`).join('')}</div></div></div>`;
}
