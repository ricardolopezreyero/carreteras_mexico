# -*- coding: utf-8 -*-
# RLR · Portada para compartir (WhatsApp, redes): og.jpg 1200×630 con la red 4.0 real — Ricardo López Reyero
# Lee los datos incrustados en ../index.html, arma portada.html y la fotografía con Chrome sin ventana.
import json, os, subprocess
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, '..')
h = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
i = h.index('const DATOS=') + len('const DATOS=')
D = json.loads(h[i:h.index(';</script>', i)])
M = D['met']
ANCHO = {2: 1.4, 4: 2.4, 6: 3.2, 8: 4.0, 10: 4.8, 12: 5.4, 14: 6.0, 16: 6.6}
nueva = lambda t: t['plan'] in ('nuevo:v4', 'nuevo:v3', 'nuevo:v2', 'v2:nueva', 'v3:nueva')
vias = ''
for t in sorted(D['tramos'], key=lambda t: t['L'][3]):
    d = t['gr'] or (t['g'] if t.get('sitio') else '') or t['g']
    if not d or not t['L'][3]: continue
    col = '#FFC857' if nueva(t) and t['geo'][3] != 'g' else '#56EF9F' if t['L'][3] >= 8 else '#cfddff'
    vias += f'<path d="{d}" stroke="{col}" stroke-width="{ANCHO.get(t["L"][3], 2.4)}"/>'
estados = ''.join(f'<path d="{e["d"]}"/>' for e in D['estados'])
ciudades = ''.join(f'<circle cx="{c["x"]}" cy="{c["y"]}" r="{2.2 if c["p"] >= 1000 else 1.4}"/>' for c in D['ciudades'] if c['p'] >= 300)
viajes, m1, m4 = M['4']['viajes'], M['1']['merc4'], M['4']['merc4']
html = f'''<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1200px;height:630px;overflow:hidden;font-family:"Plus Jakarta Sans",sans-serif;color:#fff;
  background:radial-gradient(90% 110% at 78% 50%,#0a2f86 0%,#021a57 50%,#001240 100%)}}
.txt{{position:absolute;left:64px;top:62px;width:560px}}
.marca{{display:flex;align-items:center;gap:14px;font-size:17px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#56EF9F}}
h1{{font-size:66px;line-height:1.02;letter-spacing:-.035em;font-weight:800;margin-top:30px}}
h1 em{{font-style:normal;color:#56EF9F}}
p{{font-size:25px;line-height:1.38;color:#c3d0ec;margin-top:24px;font-weight:500}}
p b{{color:#fff;font-weight:800}}
.dom{{position:absolute;left:64px;bottom:50px;font-size:21px;font-weight:700;color:#a9bbe3;letter-spacing:.01em}}
.mapa{{position:absolute;right:-6px;top:22px;width:640px;height:586px}}
.mapa .est{{fill:#0b2e80;stroke:rgba(195,208,236,.22);stroke-width:.6}}
.mapa .v{{fill:none;stroke-linecap:round;stroke-linejoin:round}}
.mapa .c{{fill:#fff}}
.x2{{position:absolute;right:58px;bottom:44px;text-align:right}}
.x2 b{{display:block;font-size:74px;font-weight:800;letter-spacing:-.04em;line-height:1;color:#FFC857}}
.x2 span{{font-size:17px;font-weight:700;color:#c3d0ec}}
</style></head><body>
<svg class="mapa" viewBox="0 0 {D['W']} {D['H']}" preserveAspectRatio="xMidYMid meet">
  <g class="est">{estados}</g><g class="v" style="filter:drop-shadow(0 0 1.5px rgba(0,18,64,.9))">{vias}</g><g class="c">{ciudades}</g>
</svg>
<div class="txt">
  <div class="marca"><svg width="44" height="44" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#001a57" stroke="rgba(169,187,227,.35)"/><path d="M22 58 30 6h4l8 52" fill="none" stroke="#56EF9F" stroke-width="5" stroke-linejoin="round"/><path d="M32 12v8M32 28v8M32 44v8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>Carreteras de México</div>
  <h1>México puede moverse <em>el doble.</em></h1>
  <p>Con la red conectada, los viajes entre ciudades se multiplican por <b>{viajes:.1f}</b> y a 4 horas de cada ciudad hay <b>{m4:.0f} millones</b> de personas, no {m1:.0f}. Más movilidad es más comercio: <b>más PIB.</b></p>
</div>
<div class="dom">carreteras.capitaltorreon.com</div>
<div class="x2"><b>×{viajes:.1f}</b><span>viajes entre ciudades</span></div>
</body></html>'''
open(os.path.join(AQUI, 'portada.html'), 'w', encoding='utf-8').write(html)
png = os.path.join(AQUI, 'portada.png')
subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--headless=new', '--disable-gpu', '--hide-scrollbars',
                '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=6000',
                f'--screenshot={png}', 'file://' + os.path.join(AQUI, 'portada.html')], check=True, capture_output=True)
subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', os.path.join(RAIZ, 'og.jpg')], check=True, capture_output=True)
os.remove(png); os.remove(os.path.join(AQUI, 'portada.html'))
print('og.jpg', os.path.getsize(os.path.join(RAIZ, 'og.jpg')) // 1024, 'KB')
