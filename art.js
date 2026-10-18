// איורי SVG של ציפורניים (להמחשה בלבד, עד שיתווספו תמונות אמיתיות)
const SHAPES = {
  almond: (x, w, h) => `M${x} ${h} V${h*0.45} Q${x+w/2} 0 ${x+w} ${h*0.45} V${h} Z`,
  square: (x, w, h) => `M${x} ${h} V12 H${x+w} V${h} Z`,
  coffin: (x, w, h) => `M${x} ${h} L${x+w*0.18} 8 H${x+w*0.82} L${x+w} ${h} Z`,
  round:  (x, w, h) => `M${x} ${h} V${h*0.4} Q${x} 4 ${x+w/2} 4 Q${x+w} 4 ${x+w} ${h*0.4} V${h} Z`,
};

function handSVG(colors, shape = "almond", accent) {
  const w = 34, gap = 10, h = 80;
  const hs = [62, 78, 86, 78, 56];
  const nails = colors.map((c, i) => {
    const x = 14 + i * (w + gap), top = 100 - hs[i % 5];
    const d = SHAPES[shape](0, w, hs[i % 5]);
    const acc = accent && i % 2 === 0
      ? `<circle cx="${w/2}" cy="${hs[i % 5] - 14}" r="3.5" fill="${accent}"/>` : "";
    return `<g transform="translate(${x} ${top})">
      <path d="${d}" fill="${c}"/>
      <path d="M6 ${hs[i % 5] - 8} V${hs[i % 5] * 0.5}" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/>
      ${acc}</g>`;
  }).join("");
  return `<svg viewBox="0 0 232 120" role="img" aria-label="ציפורניים">
    <rect width="232" height="120" rx="14" fill="#fbe9ee"/>
    ${[0,1,2,3,4].map(i => `<rect x="${14+i*(w+gap)-2}" y="${100-hs[i]+hs[i]*0.45}" width="${w+4}" height="120" rx="16" fill="#f3cbb8"/>`).join("")}
    ${nails}</svg>`;
}

function toesSVG(color, accent) {
  const sizes = [26, 18, 16, 14, 12];
  const toes = sizes.map((s, i) => {
    const cx = 36 + i * 36, cy = 70 - (i === 0 ? 8 : 0);
    return `<ellipse cx="${cx}" cy="${cy + 12}" rx="${s - 1}" ry="${s}" fill="#f3cbb8"/>
      <rect x="${cx - s*0.6}" y="${cy - s*0.1}" width="${s*1.2}" height="${s*0.8}" rx="${s*0.3}" fill="${color}"/>
      <path d="M${cx - s*0.3} ${cy + s*0.5} V${cy + s*0.15}" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
      ${accent && i % 2 === 0 ? `<circle cx="${cx}" cy="${cy + s*0.3}" r="2.5" fill="${accent}"/>` : ""}`;
  }).join("");
  return `<svg viewBox="0 0 232 120" role="img" aria-label="ציפורני רגליים">
    <rect width="232" height="120" rx="14" fill="#fbe9ee"/>${toes}</svg>`;
}

const ART = {
  gel:      () => handSVG(["#e8789a","#e8789a","#e8789a","#e8789a","#e8789a"], "almond"),
  acrylic:  () => handSVG(["#f8f1ec","#f8f1ec","#f8f1ec","#f8f1ec","#f8f1ec"], "coffin", "#c9a45c"),
  polygel:  () => handSVG(["#b9a4e0","#d9c8f2","#b9a4e0","#d9c8f2","#b9a4e0"], "square"),
  fill:     () => handSVG(["#d4375f","#d4375f","#d4375f","#d4375f","#d4375f"], "round"),
  manicure: () => handSVG(["#f2b6c6","#f2b6c6","#f2b6c6","#f2b6c6","#f2b6c6"], "round"),
  pedicure: () => toesSVG("#e8486c", "#fff"),
};

document.querySelectorAll("[data-art]").forEach(el => el.innerHTML = ART[el.dataset.art]());

const DESIGNS = [
  ["שמנת קלאסי",  () => handSVG(Array(5).fill("#f6e3d8"), "almond")],
  ["ורוד פודרה",  () => handSVG(Array(5).fill("#f2a7bd"), "coffin")],
  ["אדום יין",    () => handSVG(Array(5).fill("#8e1f3d"), "almond")],
  ["לבנדר וזהב",  () => handSVG(["#c9b6ec","#e3d8f6","#c9b6ec","#e3d8f6","#c9b6ec"], "square", "#c9a45c")],
  ["ניוד עם נצנוץ", () => handSVG(Array(5).fill("#e9c3b0"), "round", "#ffffff")],
  ["תכלת קיצי",   () => handSVG(Array(5).fill("#9fd3e6"), "coffin", "#ffffff")],
  ["פדיקור אדום", () => toesSVG("#d4375f")],
  ["פדיקור קורל", () => toesSVG("#ff8b73", "#c9a45c")],
];
const $g = document.getElementById("galleryGrid");
$g.innerHTML = DESIGNS.map(([t, f]) => `<figure>${f()}<figcaption>${t}</figcaption></figure>`).join("");
