document.getElementById('year').textContent = new Date().getFullYear();

const bootLines = [
  ['$ ', 'initializing session...'],
  ['$ ', 'loading profile: awaizazam0'],
  ['ok  ', 'core languages linked'],
  ['ok  ', 'security modules armed'],
  ['$ ', 'ready.']
];

const bootEl = document.getElementById('boot');
let li = 0, ci = 0;
const fullLine = bootLines.map(l => l[0] + l[1]).join('\n');

function typeBoot(){
  if(li < bootLines.length){
    const [prefix, text] = bootLines[li];
    const full = prefix + text;
    if(ci <= full.length){
      const rendered = bootLines.slice(0, li).map(l => {
        const cls = l[0].startsWith('ok') ? 'ok' : '';
        return `<span class="${cls}">${l[0]}${l[1]}</span>`;
      }).join('\n');
      const current = full.slice(0, ci);
      const currentCls = prefix.startsWith('ok') ? 'ok' : '';
      bootEl.innerHTML = rendered + (rendered ? '\n' : '') + `<span class="${currentCls}">${current}</span><span class="cursor"></span>`;
      ci++;
      setTimeout(typeBoot, 14 + Math.random()*18);
    } else {
      li++; ci = 0;
      setTimeout(typeBoot, 120);
    }
  } else {
    revealHero();
  }
}

function revealHero(){
  document.getElementById('heroTitle').classList.add('show');
  setTimeout(() => document.getElementById('roleLine').classList.add('show'), 150);
  setTimeout(() => document.getElementById('heroDesc').classList.add('show'), 300);
  setTimeout(() => document.getElementById('heroActions').classList.add('show'), 450);
}

if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  bootEl.innerHTML = fullLine.split('\n').map(l => l.startsWith('ok') ? `<span class="ok">${l}</span>` : l).join('\n');
  revealHero();
} else {
  typeBoot();
}
