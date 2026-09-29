/* ── Ejecución · Cotizador: precio de un corredor con el estándar de 50 años — RLR · Ricardo López Reyero ── */
let COT = {...COTIZA_BASE, precios: {...PRECIOS_BASE}};   // se conserva al cambiar de sección
PAGINAS.cotizador = () => {
  const opt = (v, t, sel) => `<option value="${v}"${String(sel) === String(v) ? ' selected' : ''}>${t}</option>`;
  const obras = PL.map((p, k) => [k, p]).filter(([, p]) => p.kc > 0);
  pagina.innerHTML = `<div class="doc cot">
    ${heroDoc('Cuánto cuesta un corredor <em>bien hecho</em>, partida por partida.',
      'El cotizador usa las mismas cantidades de la especificación de 50 años, la plantilla con sus sueldos y la flotilla de un frente. Cambia el tramo o los precios y el resultado se recalcula al instante. Cubre el pavimento completo, de la subrasante a la losa; no incluye terracerías mayores, puentes, túneles ni derecho de vía.')}
    <div class="cot-grid">
      <form class="cot-form" id="cot-form" onsubmit="return false">
        <div class="cot-bloque">
          <h4>El tramo</h4>
          <label>Tomar una obra del plan<select name="obra"><option value="">— escribir a mano —</option>${obras.map(([k, p]) => `<option value="${k}">${k + 1}. ${p.n}</option>`).join('')}</select></label>
          <div class="cot-dos">
            <label>Kilómetros<input name="km" type="number" min="1" step="1" value="${COT.km}"></label>
            <label>Carriles nuevos<select name="carriles">${[2, 4, 6, 8, 10].map(n => opt(n, n, COT.carriles)).join('')}</select></label>
          </div>
          <label>Losa<select name="losa">${opt('crcp', 'Concreto reforzado continuo (CRCP), sin juntas', COT.losa)}${opt('juntas', 'Losa con juntas y pasajuntas, 30 cm', COT.losa)}</select></label>
          <label class="cot-rango">Espesor de la losa <b id="cot-esp">${Math.round(COT.espesor * 100)} cm</b><input name="espesor" type="range" min="23" max="30" step="1" value="${Math.round(COT.espesor * 100)}"></label>
          <label>Acotamientos de concreto por cuerpo<select name="hombro">${[0, 2.5, 3, 3.5].map(n => opt(n, n ? `${n.toFixed(1)} m` : 'sin acotamientos', COT.hombro)).join('')}</select></label>
        </div>
        <div class="cot-bloque">
          <h4>La obra</h4>
          <div class="cot-dos">
            <label>Planta a<select name="distancia">${[5, 10, 15, 25].map(n => opt(n, `${n} km del colado`, COT.distancia)).join('')}</select></label>
            <label>Frentes en paralelo<select name="frentes">${[1, 2, 3, 4, 6].map(n => opt(n, n, COT.frentes)).join('')}</select></label>
          </div>
          <div class="cot-dos">
            <label>Anticipo del cliente<select name="anticipo">${[0, 0.1, 0.2, 0.3].map(n => opt(n, `${n * 100} %`, COT.anticipo)).join('')}</select></label>
            <label class="cot-rango">Utilidad <b id="cot-util">${Math.round(COT.utilidad * 100)} %</b><input name="utilidad" type="range" min="8" max="15" step="1" value="${Math.round(COT.utilidad * 100)}"></label>
          </div>
        </div>
        <details class="cot-bloque cot-precios"><summary>Precios unitarios <span>edítalos con los del corredor</span></summary>
          ${Object.keys(PRECIOS_BASE).map(k => `<label class="cot-precio"><span>${PRECIO_ETQ[k][0]} <em>$/${PRECIO_ETQ[k][1]}</em></span><input name="p-${k}" type="number" min="0" step="any" value="${COT.precios[k]}"></label>`).join('')}
          <button type="button" class="cot-rest" id="cot-rest">Volver a los precios de referencia</button>
        </details>
      </form>
      <div class="cot-res" id="cot-res" aria-live="polite"></div>
    </div>
    <p class="nota">Precios de referencia de 2026 sin IVA, para dimensionar y negociar; la cotización formal se cierra con los precios del banco de caliza, la acería y la cementera del corredor. La supervisión independiente (≈ 5 %) la contrata el cliente y va aparte. Detalle del modelo en <a href="#negocio" data-ir="negocio">Modelo de negocio</a> y de la gente en <a href="#equipo" data-ir="equipo">Plantilla y organigrama</a>.</p>
  </div>`;
  const f = $('#cot-form');
  const leer = () => {
    const g = n => f.elements[n].value;
    COT = {km: Math.max(1, +g('km') || 1), carriles: +g('carriles'), losa: g('losa'), espesor: +g('espesor') / 100, hombro: +g('hombro'),
      distancia: +g('distancia'), frentes: +g('frentes'), anticipo: +g('anticipo'), utilidad: +g('utilidad') / 100,
      precios: Object.fromEntries(Object.keys(PRECIOS_BASE).map(k => [k, Math.max(0, +g('p-' + k) || 0)]))};
    $('#cot-esp').textContent = COT.losa === 'juntas' ? '30 cm (con juntas)' : Math.round(COT.espesor * 100) + ' cm';
    $('#cot-util').textContent = Math.round(COT.utilidad * 100) + ' %';
    f.elements.espesor.disabled = COT.losa === 'juntas';
    pintarCotizacion();
  };
  f.addEventListener('input', e => { if (e.target.name !== 'obra') { f.elements.obra.value = ''; } leer(); });
  f.elements.obra.addEventListener('change', e => {
    const p = PL[+e.target.value]; if (!p) return;
    f.elements.km.value = p.km; f.elements.carriles.value = Math.min(10, Math.max(2, Math.round(p.kc / p.km / 2) * 2)); leer();
  });
  $('#cot-rest').onclick = () => { Object.keys(PRECIOS_BASE).forEach(k => { f.elements['p-' + k].value = PRECIOS_BASE[k]; }); leer(); };
  leer();
};
const COL_PARTIDA = {mat: '#cfddff', gente: '#56EF9F', eq: '#9fc0ff', ind: '#a9bbe3', util: '#FFC857'};
function pintarCotizacion() {
  const r = cotizar(COT), res = $('#cot-res'); if (!res) return;
  const grupos = [['mat', 'Materiales'], ['gente', 'Gente'], ['eq', 'Equipo'], ['ind', 'Indirectos'], ['util', 'Utilidad']]
    .map(([k, n]) => [k, n, r.partidas.filter(p => p[3] === k).reduce((s, p) => s + p[1], 0)]);
  const meses = r.anios * 12;
  const texto = `Cotización · Carreteras de México (estándar de pavimento para 50 años)\n${fmt(COT.km)} km · ${COT.carriles} carriles nuevos · ${COT.losa === 'juntas' ? 'losa con juntas de 30 cm' : `CRCP de ${Math.round(r.e * 100)} cm`} · acotamientos ${COT.hombro} m por cuerpo\nPrecio sin IVA: ${mxn(r.precio)} (${mxn(r.porKm)} por km · $${fmt(r.porM2)} por m²)\nCon IVA: ${mxn(r.precio + r.iva)}\nPlazo: ${meses < 24 ? Math.ceil(meses) + ' meses' : r.anios.toFixed(1) + ' años'} con ${COT.frentes} frente${COT.frentes > 1 ? 's' : ''}\nConservación por disponibilidad (referencia): ${mxn(r.anualidad)} al año\nPrecios de referencia 2026, sin supervisión independiente, terracerías mayores, estructuras ni derecho de vía.`;
  res.innerHTML = `
    <div class="cot-precio-total"><span>Precio sin IVA</span><b>${mxn(r.precio)}</b><em>${mxn(r.precio + r.iva)} con IVA</em></div>
    <div class="banda cot-banda"><div><b>${mxn(r.porKm)}</b><span>por km de corredor</span></div><div><b>${mxn(r.porKc)}</b><span>por km-carril</span></div><div><b>$${fmt(r.porM2)}</b><span>por m² de pavimento</span></div></div>
    <div class="banda cot-banda"><div><b>${meses < 24 ? Math.ceil(meses) + ' meses' : r.anios.toFixed(1) + ' años'}</b><span>de colado con ${COT.frentes} frente${COT.frentes > 1 ? 's' : ''}</span></div><div><b>${fmt(r.personas)}</b><span>personas en obra</span></div><div><b>${r.camiones}</b><span>revolvedoras por frente</span></div></div>
    <div class="sub" style="margin-top:14px">En qué se va cada peso</div>
    <div class="pila cot-pila">${grupos.map(([k, n, v]) => `<i title="${n}: ${pct(v / r.precio)}" style="flex:${v};background:${COL_PARTIDA[k]}"></i>`).join('')}</div>
    <div class="ley-col" style="margin:8px 0 4px">${grupos.map(([k, n, v]) => `<span><i style="background:${COL_PARTIDA[k]}"></i>${n} ${pct(v / r.precio)}</span>`).join('')}</div>
    <table class="tabla cot-tabla"><tbody>${r.partidas.map(([n, v, d, k]) => `<tr><td><i style="background:${COL_PARTIDA[k]}"></i>${n}<small>${d}</small></td><td>${mxn(v)}</td><td>${pct(v / r.precio)}</td></tr>`).join('')}
      <tr class="tot"><td>Precio sin IVA</td><td>${mxn(r.precio)}</td><td>100 %</td></tr></tbody></table>
    <div class="cot-piso"><b>Piso de precio: ${mxn(r.piso)}</b> (${mxn(r.piso / COT.km)} por km). Es el costo completo sin utilidad: debajo de ahí no se firma, porque un pavimento al 70 % de la especificación no aguanta la garantía ni la conservación.</div>
    <div class="sub" style="margin-top:14px">Materiales que hay que asegurar</div>
    <div class="cot-mat">${[['Concreto de losa', r.q.concreto, 'm³'], ['Cemento', r.q.cemento, 't'], ['Ceniza volante', r.q.ceniza, 't'], ['Caliza y arena', r.q.caliza, 't'], ['Acero', r.q.acero, 't'], ['Diésel', r.q.diesel, 'L']]
      .map(([n, v, u]) => `<div><b>${fmt(v)}</b><span>${u} · ${n}</span></div>`).join('')}</div>
    <div class="sub" style="margin-top:14px">Después de la obra</div>
    <div class="cot-piso" style="border-color:rgba(86,239,159,.35);background:rgba(86,239,159,.06)"><b>Conservación por disponibilidad: ${mxn(r.anualidad)} al año</b> durante 30 años, de referencia. Sale del costo esperado del pavimento (${mxn(r.conservacionAnio)} al año en esmerilado, parches, drenes, señalización y tablero) con 30 % de margen. Es el negocio de largo plazo.</div>
    <div class="cot-piso"><b>Capital de trabajo: ${mxn(r.capitalTrabajo)}</b>. Dos meses y medio de costo que se pagan antes de cobrar (la estimación se cobra a 120 días y los proveedores dan 60), menos la parte del anticipo que aún no se amortiza. Es el límite real del negocio, más que la flotilla.</div>
    <button type="button" class="p3d-btn cot-copiar" id="cot-copiar">Copiar cotización</button>`;
  $('#cot-copiar').onclick = async () => {
    const b = $('#cot-copiar');
    try { await navigator.clipboard.writeText(texto); b.textContent = 'Copiada ✓'; } catch (e) { b.textContent = 'No se pudo copiar'; }
    setTimeout(() => { if (b.isConnected) b.textContent = 'Copiar cotización'; }, 1800);
  };
}
