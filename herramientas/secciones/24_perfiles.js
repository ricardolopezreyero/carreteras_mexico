/* ── Ejecución · Perfiles de puesto: un manual de contratación e ingreso en Word por puesto — RLR · EYE 181218 ── */
PAGINAS.perfiles = () => {
  const grupos = [...new Set(PERFILES_DOC.map(p => p.g))];
  const plazas = PERFILES_DOC.filter(p => !p.an).reduce((s, p) => s + p.c, 0);
  const svgBajar = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
  const variable = p => p.an ? `${p.v} % anual` : `+${p.v} % al mes`;
  const ficha = p => `<div class="pf-card" data-q="${(p.n + ' ' + p.g + ' ' + p.r + ' ' + p.m).toLowerCase()}">
      <div class="pf-top"><h4>${p.n}</h4><span class="pf-plazas" title="Plazas">${p.c}</span></div>
      <div class="pf-meta"><span>${p.l}</span><span>${p.t}</span><span>reporta a ${p.r}</span></div>
      <p class="pf-mision">${p.m}</p>
      <p class="pf-exp"><b>Experiencia:</b> ${p.x}</p>
      <div class="pf-pie"><div class="pf-sueldo"><b>${mxn(p.s)}</b> al mes <span>${variable(p)}</span></div>
        <a class="pf-bajar" href="${p.a}" download="${p.d}">${svgBajar}Word <small>${p.kb} KB</small></a></div>
    </div>`;
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Un manual por puesto, <em>leído antes del primer turno</em>.',
      `Son ${PERFILES_DOC.length} puestos y ${plazas} plazas por frente, más la estructura de proyecto. Cada uno tiene su documento en Word: a quién buscamos y cómo lo entrevistamos, lo que tiene que saber y cómo lo vamos a formar. Se usa para contratar y se entrega completo el día de la oferta.`)}
    <div class="pf-zip">
      <div><b>Todos los perfiles en un solo archivo</b><span>${PERFILES_DOC.length} documentos de Word · ZIP de ${fmt(Math.round(PERFILES_ZIP.kb))} KB · versión 1</span></div>
      <a class="pf-bajar grande" href="${PERFILES_ZIP.a}" download="${PERFILES_ZIP.d}">${svgBajar}Descargar todos</a>
    </div>

    ${h2Doc('pf-como', 'Contratar, entregar, comprobar', 'Cómo se usan')}
    <div class="dcards">
      ${tarjeta('<i>1</i>Para contratar', 'La parte 1 es el perfil: experiencia, escolaridad, el tipo de persona, las señales de alerta, las preguntas de entrevista con la respuesta que buscamos y una prueba práctica en campo.', 'Quien entrevista lleva el documento impreso y marca lo que escuchó.')}
      ${tarjeta('<i>2</i>Para entregar', 'El día de la oferta se entrega completo. La persona lo lee antes de su primer turno: la parte 2 es lo que tiene que saber y la parte 3, cómo la vamos a formar.', 'Nadie empieza solo ni a velocidad plena.')}
      ${tarjeta('<i>3</i>Para comprobar', 'Al terminar el ingreso, el jefe directo hace las preguntas de comprobación. Se contestan sin leer. Luego se firma la constancia de lectura.', 'La constancia se archiva en el expediente de la persona.')}
    </div>
    <h3>Qué trae cada manual</h3>
    ${tablaDoc(['Parte', 'Qué trae'], [
      ['Portada y carta', 'Los datos del puesto (línea, a quién reporta, plazas, turno, sueldo y variable) y una carta de bienvenida con el porqué del proyecto.'],
      ['1 · El perfil', 'Para qué existe el puesto, de qué responde, qué puede decidir, experiencia, escolaridad, tipo de persona, señales de alerta, preguntas de entrevista, prueba práctica, sueldo, variable e indicadores.'],
      ['2 · Lo que tiene que saber', 'Un día normal, lo específico del puesto, los números que tiene que traer en la cabeza, los errores que cuestan 50 años y lo que todos saben en esta obra.'],
      ['3 · Su capacitación', 'Semana por semana, con quién aprende, sus certificaciones, las preguntas de comprobación y su siguiente escalón.'],
      ['4 · El acuerdo', 'Lo que le prometemos, lo que le pedimos y la constancia de lectura con firma.'],
    ])}
    <p class="nota">Los sueldos y las plazas salen de la misma base que el Cotizador y la <a href="#equipo" data-ir="equipo" style="color:var(--green)">Plantilla</a>: si cambian ahí, se regeneran los documentos.</p>

    ${h2Doc('pf-lista', 'Uno por puesto', 'Los perfiles')}
    <div class="pf-filtros">
      <input id="pf-buscar" type="search" placeholder="Busca un puesto: operador, cabo, laboratorio…" aria-label="Buscar un puesto">
      <div class="pf-chips">${['Todos', ...grupos].map((g, i) => `<button class="pf-chip${i ? '' : ' act'}" data-g="${i ? g : ''}">${g}</button>`).join('')}</div>
    </div>
    <div id="pf-grupos">${grupos.map(g => {
      const ps = PERFILES_DOC.filter(p => p.g === g);
      return `<section class="pf-grupo" data-g="${g}"><h3>${g} <span>${ps.length} ${ps.length === 1 ? 'puesto' : 'puestos'} · ${ps.reduce((s, p) => s + p.c, 0)} plazas</span></h3>
        <div class="pf-cards">${ps.map(ficha).join('')}</div></section>`;
    }).join('')}</div>
    <p class="nota" id="pf-nada" hidden>Ningún puesto coincide con la búsqueda.</p>
  </div>`;
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
  pagina.querySelectorAll('.pf-chip').forEach(b => b.onclick = () => {
    grupo = b.dataset.g; pagina.querySelectorAll('.pf-chip').forEach(x => x.classList.toggle('act', x === b)); filtrar();
  });
};
