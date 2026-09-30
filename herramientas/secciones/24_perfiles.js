/* ── Ejecución · Perfiles de puesto: un manual de contratación e ingreso en Word por puesto — RLR · EYE 181218 ──
   Los Word salen de herramientas/perfiles.py con los sueldos de 12_costos.js. Cada monto va en su propia corrida con
   estilo M_<clave>; si aquí se edita un sueldo, la descarga abre el Word, reescribe esas corridas y lo entrega nuevo. */
PAGINAS.perfiles = () => {
  const LLAVE = 'carreteras.sueldos.v1';
  let edit = {};
  try { edit = JSON.parse(localStorage.getItem(LLAVE) || '{}') || {}; } catch (e) { edit = {}; }
  const guardar = () => { try { localStorage.setItem(LLAVE, JSON.stringify(edit)); } catch (e) {} };
  const actual = p => ({s: edit[p.n]?.s ?? p.s, v: edit[p.n]?.v ?? p.v});
  const editado = p => { const a = actual(p); return a.s !== p.s || a.v !== p.v; };
  const peso = x => '$' + Math.floor(x + 0.5).toLocaleString('en-US');
  // misma cuenta que montos() en herramientas/perfiles.py
  const montos = (s, v, anual) => ({base: peso(s), varp: String(v), var: peso(anual ? s * 12 * v / 100 : s * v / 100),
    total: peso(anual ? s * 12 * (1 + v / 100) : s * (1 + v / 100)), anual: peso(s * 12)});

  const grupos = [...new Set(PERFILES_DOC.map(p => p.g))];
  const plazas = PERFILES_DOC.filter(p => !p.an).reduce((s, p) => s + p.c, 0);
  const svgBajar = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
  const sueldoHTML = p => { const a = actual(p); return `<b>${peso(a.s)}</b> al mes <span>${p.an ? `${a.v} % anual` : `+${a.v} % al mes`}</span>${editado(p) ? '<em class="pf-ed">editado</em>' : ''}`; };
  const ficha = (p, i) => `<div class="pf-card" data-i="${i}" data-q="${(p.n + ' ' + p.g + ' ' + p.r + ' ' + p.m + ' ' + p.k).toLowerCase()}">
      <div class="pf-top"><h4>${p.n}</h4><span class="pf-plazas" title="Plazas">${p.c}</span></div>
      <div class="pf-meta"><span>${p.l}</span><span>${p.t}</span><span>reporta a ${p.r}</span></div>
      <p class="pf-mision">${p.m}</p>
      <p class="pf-kpi"><b>KPI principal:</b> ${p.k} · <span>${p.km}</span></p>
      <p class="pf-exp"><b>Experiencia:</b> ${p.x}</p>
      <div class="pf-pie"><div class="pf-sueldo">${sueldoHTML(p)}</div>
        <a class="pf-bajar" data-i="${i}" href="${p.a}" download="${p.d}">${svgBajar}Word <small>${p.kb} KB</small></a></div>
    </div>`;
  const filaSueldo = (p, i) => { const a = actual(p);
    return `<tr data-i="${i}"${editado(p) ? ' class="act"' : ''}><td>${p.n}</td><td class="num">${p.c}</td>
      <td class="num"><input class="pf-in" data-i="${i}" data-k="s" type="number" min="0" step="500" value="${a.s}" aria-label="Sueldo mensual de ${p.n}"></td>
      <td class="num"><input class="pf-in pct" data-i="${i}" data-k="v" type="number" min="0" max="100" step="1" value="${a.v}" aria-label="Variable de ${p.n}"></td>
      <td class="num pf-tot">${montos(a.s, a.v, p.an).total}${p.an ? ' al año' : ''}</td></tr>`; };

  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Un manual por puesto, <em>firmado el día que entra</em>.',
      `Son ${PERFILES_DOC.length} puestos y ${plazas} plazas por frente, más la estructura de proyecto. Cada uno tiene su documento en Word con todo junto: el perfil, lo que tiene que saber, su capacitación, su KPI principal, su sueldo, los motivos exactos de despido y una última hoja para firmar de aceptado. Es el anexo de su contrato.`)}
    <div class="pf-zip">
      <div><b>Todos los perfiles en un solo archivo</b><span id="pf-zip-info">${PERFILES_DOC.length} documentos de Word · ZIP de ${fmt(Math.round(PERFILES_ZIP.kb))} KB</span></div>
      <a class="pf-bajar grande" id="pf-zip" href="${PERFILES_ZIP.a}" download="${PERFILES_ZIP.d}">${svgBajar}Descargar todos</a>
    </div>
    ${indiceDoc([['pf-como', 'Cómo se usan'], ['pf-sueldos', 'Tabla de sueldos'], ['pf-lista', 'Los perfiles']])}

    ${h2Doc('pf-como', 'Contratar, entregar, firmar', 'Cómo se usan')}
    <div class="dcards">
      ${tarjeta('<i>1</i>Para contratar', 'La parte 1 es el perfil: experiencia, escolaridad, el tipo de persona, las señales de alerta, las preguntas de entrevista con la respuesta que buscamos y una prueba práctica en campo.', 'Quien entrevista lleva el documento impreso y marca lo que escuchó.')}
      ${tarjeta('<i>2</i>Para entregar', 'El día de la oferta se entrega completo, con el sueldo ya escrito. La persona lo lee antes de su primer turno: lo que tiene que saber, su capacitación, su KPI y los motivos de despido.', 'Nadie se entera de las reglas el día que lo despiden.')}
      ${tarjeta('<i>3</i>Para firmar', 'La última hoja se firma de aceptado: nombre escrito a mano, firma, fecha y lugar, de la persona, su jefe directo y la empresa. Una copia al expediente y otra para la persona.', 'Al terminar la capacitación, el jefe hace las preguntas de comprobación.')}
    </div>
    <h3>Qué trae cada manual</h3>
    ${tablaDoc(['Parte', 'Qué trae'], [
      ['Portada y carta', 'Los datos del puesto: línea, a quién reporta, plazas, turno, sueldo, variable y KPI principal. Una carta de bienvenida con el porqué del proyecto.'],
      ['1 · El perfil', 'Para qué existe el puesto, de qué responde, qué puede decidir, experiencia, escolaridad, tipo de persona, señales de alerta, preguntas de entrevista y prueba práctica.'],
      ['2 · Lo que tiene que saber', 'Un día normal, lo específico del puesto, los números que tiene que traer en la cabeza, los errores que cuestan 50 años y lo que todos saben en esta obra.'],
      ['3 · Su capacitación', 'Semana por semana y con quién aprende, sus certificaciones, las preguntas de comprobación y su siguiente escalón.'],
      ['4 · Su KPI y su sueldo', 'El KPI principal con su meta, quién lo mide y cuándo se enciende la alerta; sus demás indicadores; sueldo y variable; y qué pasa si no llega a su KPI (plan de mejora, nunca despido sin indemnización).'],
      ['5 · Motivos de despido', 'Los del puesto, los de toda la obra y los de la ley (artículo 47), lo que nunca es motivo de despido y cómo se hace si llega a pasar.'],
      ['6 · El acuerdo y la firma', 'Lo que le prometemos, lo que le pedimos y la hoja de aceptación con nombre escrito a mano, firma, fecha y lugar.'],
    ])}

    ${h2Doc('pf-sueldos', 'Se cambia aquí y sale en el Word', 'Tabla de sueldos')}
    <p>Cambia el sueldo mensual bruto o el porcentaje de variable de cualquier puesto. El documento que descargues de ese puesto ya sale con el nuevo sueldo en la portada, en la parte 4 y en la hoja de firma, y el ZIP también. Los cambios se guardan en este navegador.</p>
    <div class="pf-tabla-acciones">
      <span id="pf-nomina"></span>
      <button class="pf-chip" id="pf-restaurar">Restaurar los sueldos de referencia</button>
      <button class="pf-chip" id="pf-csv">Descargar la tabla (CSV)</button>
    </div>
    <div class="tabla-envoltura"><table class="tabla-doc pf-tabla" id="pf-tabla"><thead><tr><th>Puesto</th><th class="num">Plazas</th><th class="num">Sueldo mensual</th><th class="num">Variable %</th><th class="num">Con meta cumplida</th></tr></thead>
      <tbody>${grupos.map(g => `<tr class="pf-sep"><td colspan="5">${g}</td></tr>` + PERFILES_DOC.map((p, i) => p.g === g ? filaSueldo(p, i) : '').join('')).join('')}</tbody></table></div>

    ${h2Doc('pf-lista', 'Uno por puesto', 'Los perfiles')}
    <div class="pf-filtros">
      <input id="pf-buscar" type="search" placeholder="Busca un puesto: operador, cabo, laboratorio…" aria-label="Buscar un puesto">
      <div class="pf-chips">${['Todos', ...grupos].map((g, i) => `<button class="pf-chip${i ? '' : ' act'}" data-g="${i ? g : ''}">${g}</button>`).join('')}</div>
    </div>
    <div id="pf-grupos">${grupos.map(g => {
      const ps = PERFILES_DOC.map((p, i) => [p, i]).filter(([p]) => p.g === g);
      return `<section class="pf-grupo" data-g="${g}"><h3>${g} <span>${ps.length} ${ps.length === 1 ? 'puesto' : 'puestos'} · ${ps.reduce((s, [p]) => s + p.c, 0)} plazas</span></h3>
        <div class="pf-cards">${ps.map(([p, i]) => ficha(p, i)).join('')}</div></section>`;
    }).join('')}</div>
    <p class="nota" id="pf-nada" hidden>Ningún puesto coincide con la búsqueda.</p>
  </div>`;

  // ── búsqueda y filtro por grupo ──
  let grupo = '';
  const filtrar = () => {
    const q = pagina.querySelector('#pf-buscar').value.trim().toLowerCase();
    let hay = 0;
    pagina.querySelectorAll('.pf-grupo').forEach(s => {
      let n = 0;
      s.querySelectorAll('.pf-card').forEach(c => { const ok = (!grupo || s.dataset.g === grupo) && (!q || c.dataset.q.includes(q)); c.hidden = !ok; n += ok; });
      s.hidden = !n; hay += n;
    });
    pagina.querySelector('#pf-nada').hidden = !!hay;
  };
  pagina.querySelector('#pf-buscar').oninput = filtrar;
  pagina.querySelectorAll('.pf-chips .pf-chip').forEach(b => b.onclick = () => {
    grupo = b.dataset.g; pagina.querySelectorAll('.pf-chips .pf-chip').forEach(x => x.classList.toggle('act', x === b)); filtrar();
  });

  // ── tabla de sueldos ──
  const nomina = () => {
    const mes = PERFILES_DOC.filter(p => !p.an).reduce((s, p) => s + p.c * actual(p).s, 0);
    const cambios = PERFILES_DOC.filter(editado).length;
    pagina.querySelector('#pf-nomina').innerHTML = `Nómina base de un frente: <b>${mxn(mes)}</b> al mes${cambios ? ` · <b style="color:var(--amber)">${cambios} ${cambios === 1 ? 'puesto editado' : 'puestos editados'}</b>` : ''}`;
    pagina.querySelector('#pf-zip-info').textContent = `${PERFILES_DOC.length} documentos de Word · ` + (cambios ? `se arma con ${cambios === 1 ? 'el sueldo editado' : 'los sueldos editados'}` : `ZIP de ${fmt(Math.round(PERFILES_ZIP.kb))} KB`);
  };
  const refrescar = i => {
    const p = PERFILES_DOC[i], a = actual(p), tr = pagina.querySelector(`#pf-tabla tr[data-i="${i}"]`);
    if (tr) { tr.classList.toggle('act', editado(p)); tr.querySelector('.pf-tot').textContent = montos(a.s, a.v, p.an).total + (p.an ? ' al año' : ''); }
    const c = pagina.querySelector(`.pf-card[data-i="${i}"] .pf-sueldo`); if (c) c.innerHTML = sueldoHTML(p);
    nomina();
  };
  pagina.querySelectorAll('.pf-in').forEach(inp => inp.oninput = () => {
    const i = +inp.dataset.i, p = PERFILES_DOC[i], x = Number(inp.value);
    if (!(x >= 0) || inp.value === '') return;
    const e = {...actual(p), [inp.dataset.k]: x};
    if (e.s === p.s && e.v === p.v) delete edit[p.n]; else edit[p.n] = e;
    guardar(); refrescar(i);
  });
  pagina.querySelector('#pf-restaurar').onclick = () => {
    edit = {}; guardar();
    pagina.querySelectorAll('.pf-in').forEach(inp => { const p = PERFILES_DOC[+inp.dataset.i]; inp.value = inp.dataset.k === 's' ? p.s : p.v; });
    PERFILES_DOC.forEach((p, i) => refrescar(i));
  };
  pagina.querySelector('#pf-csv').onclick = () => {
    const filas = [['Grupo', 'Puesto', 'Plazas', 'Sueldo mensual', 'Variable %', 'Con meta cumplida', 'Editado'],
      ...PERFILES_DOC.map(p => { const a = actual(p); return [p.g, p.n, p.c, a.s, a.v, montos(a.s, a.v, p.an).total.replace(/[$,]/g, ''), editado(p) ? 'sí' : '']; })];
    const csv = '﻿' + filas.map(f => f.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    bajar(new Blob([csv], {type: 'text/csv'}), `Tabla de sueldos · Carreteras de México · ${new Date().toISOString().slice(0, 10)}.csv`);
  };
  nomina();

  // ── descargas con el sueldo editado ──
  const bajar = (blob, nombre) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); };
  const jszip = () => window.JSZip ? Promise.resolve(window.JSZip) : new Promise((ok, mal) => {
    const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    s.onload = () => ok(window.JSZip); s.onerror = () => mal(new Error('No se pudo cargar el armador de Word')); document.head.appendChild(s);
  });
  const conSueldo = async p => {
    const JSZip = await jszip(), z = await JSZip.loadAsync(await fetch(p.a).then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }));
    const a = actual(p), m = montos(a.s, a.v, p.an);
    let x = await z.file('word/document.xml').async('string');
    x = x.replace(/(<w:rStyle w:val="M_(\w+)"\/>(?:(?!<\/w:r>)[\s\S])*?<w:t(?: [^>]*)?>)[^<]*/g, (todo, antes, k) => m[k] != null ? antes + m[k] : todo);
    z.file('word/document.xml', x);
    return z;
  };
  const nombreEditado = p => p.d.replace(/\.docx$/, ` · sueldo ${peso(actual(p).s)}.docx`);
  const ocupado = (el, si, txt) => { el.classList.toggle('ocupado', si); if (txt) el.dataset.txt = txt; };
  pagina.querySelectorAll('.pf-card .pf-bajar').forEach(el => el.onclick = async e => {
    const p = PERFILES_DOC[+el.dataset.i];
    if (!editado(p)) return;                       // sin cambios: el Word publicado tal cual
    e.preventDefault(); if (el.classList.contains('ocupado')) return;
    ocupado(el, true);
    try { const z = await conSueldo(p); bajar(await z.generateAsync({type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}), nombreEditado(p)); }
    catch (err) { alert('No se pudo armar el Word con el sueldo editado. Revisa tu conexión e intenta de nuevo.'); }
    ocupado(el, false);
  });
  const zipEl = pagina.querySelector('#pf-zip');
  zipEl.onclick = async e => {
    if (!PERFILES_DOC.some(editado)) return;
    e.preventDefault(); if (zipEl.classList.contains('ocupado')) return;
    ocupado(zipEl, true);
    try {
      const JSZip = await jszip(), todo = new JSZip(), carpeta = 'Perfiles de puesto · Carreteras de México/';
      for (const [i, p] of PERFILES_DOC.entries()) {
        const n = String(i + 1).padStart(2, '0');
        const blob = editado(p) ? await (await conSueldo(p)).generateAsync({type: 'uint8array'}) : new Uint8Array(await fetch(p.a).then(r => r.arrayBuffer()));
        todo.file(`${carpeta}${n} · ${p.n}${editado(p) ? ` · sueldo ${peso(actual(p).s)}` : ''}.docx`, blob);
      }
      bajar(await todo.generateAsync({type: 'blob', compression: 'DEFLATE'}), PERFILES_ZIP.d.replace(/\.zip$/, ' · sueldos editados.zip'));
    } catch (err) { alert('No se pudo armar el ZIP. Revisa tu conexión e intenta de nuevo.'); }
    ocupado(zipEl, false);
  };
};
