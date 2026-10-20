// איורי SVG של ציפורניים ודמויות (להמחשה בלבד, עד שיתווספו תמונות אמיתיות)
const SHAPES = {
  almond: (x, w, h) => `M${x} ${h} V${h*0.45} Q${x+w/2} 0 ${x+w} ${h*0.45} V${h} Z`,
  square: (x, w, h) => `M${x} ${h} V12 H${x+w} V${h} Z`,
  coffin: (x, w, h) => `M${x} ${h} L${x+w*0.18} 8 H${x+w*0.82} L${x+w} ${h} Z`,
  round:  (x, w, h) => `M${x} ${h} V${h*0.4} Q${x} 4 ${x+w/2} 4 Q${x+w} 4 ${x+w} ${h*0.4} V${h} Z`,
};
let uid = 0;

function handSVG(colors, shape = "almond", accent, bg = ["#ffd6e8", "#ffe9b8"]) {
  const id = "g" + uid++;
  const w = 34, gap = 10;
  const hs = [62, 78, 86, 78, 56];
  const skin = "#f6c3a5";
  const fingers = hs.map((h, i) => `<rect x="${12 + i*(w+gap)}" y="${100-h+h*0.45}" width="${w+4}" height="120" rx="17" fill="${skin}"/>`).join("");
  const nails = colors.map((c, i) => {
    const x = 14 + i * (w + gap), h = hs[i], top = 100 - h;
    const acc = accent && i % 2 === 0 ? `<circle cx="${w/2}" cy="${h-14}" r="3.5" fill="${accent}"/><circle cx="${w/2+8}" cy="${h-26}" r="2" fill="${accent}"/>` : "";
    return `<g transform="translate(${x} ${top})"><path d="${SHAPES[shape](0, w, h)}" fill="${c}"/>
      <path d="M6 ${h-8} V${h*0.5}" stroke="#fff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/>${acc}</g>`;
  }).join("");
  return `<svg viewBox="0 0 232 120" role="img" aria-label="ציפורניים">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
    <rect width="232" height="120" rx="14" fill="url(#${id})"/>
    <circle cx="206" cy="22" r="26" fill="#fff" fill-opacity=".25"/><circle cx="24" cy="100" r="18" fill="#fff" fill-opacity=".2"/>
    ${fingers}${nails}</svg>`;
}

function toesSVG(color, accent, bg = ["#c7f2ee", "#e2d4ff"]) {
  const id = "g" + uid++;
  const sizes = [26, 18, 16, 14, 12];
  const toes = sizes.map((s, i) => {
    const cx = 36 + i * 36, cy = 70 - (i === 0 ? 8 : 0);
    return `<ellipse cx="${cx}" cy="${cy+12}" rx="${s-1}" ry="${s}" fill="#f6c3a5"/>
      <rect x="${cx-s*0.6}" y="${cy-s*0.1}" width="${s*1.2}" height="${s*0.8}" rx="${s*0.3}" fill="${color}"/>
      <path d="M${cx-s*0.3} ${cy+s*0.5} V${cy+s*0.15}" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
      ${accent && i % 2 === 0 ? `<circle cx="${cx}" cy="${cy+s*0.3}" r="2.5" fill="${accent}"/>` : ""}`;
  }).join("");
  return `<svg viewBox="0 0 232 120" role="img" aria-label="ציפורני רגליים">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
    <rect width="232" height="120" rx="14" fill="url(#${id})"/>
    <circle cx="200" cy="24" r="24" fill="#fff" fill-opacity=".3"/>${toes}</svg>`;
}

// דמות מצוירת: hair/top/bg צבעים, hand = ציפורניים מורמות
function characterSVG({ hair = "#3b1d5a", top = "#ff3d8b", bg = ["#ffd6e8", "#d9c8ff"], nail = "#ffc531", label = "דמות" } = {}) {
  const id = "g" + uid++;
  return `<svg viewBox="0 0 200 220" role="img" aria-label="${label}">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
    <rect width="200" height="220" rx="28" fill="url(#${id})"/>
    <circle cx="165" cy="40" r="22" fill="#fff" fill-opacity=".35"/><circle cx="30" cy="170" r="14" fill="#fff" fill-opacity=".3"/>
    <path d="M100 18c-42 0-62 30-62 70 0 24 4 48 12 66h100c8-18 12-42 12-66 0-40-20-70-62-70Z" fill="${hair}"/>
    <path d="M52 220c0-34 22-52 48-52s48 18 48 52Z" fill="${top}"/>
    <rect x="88" y="132" width="24" height="30" rx="10" fill="#f6c3a5"/>
    <ellipse cx="100" cy="96" rx="40" ry="46" fill="#f9d0b4"/>
    <path d="M60 86c4-34 28-42 40-42s38 8 42 42c-14-14-30-20-42-20s-28 6-40 20Z" fill="${hair}"/>
    <ellipse cx="84" cy="100" rx="4.5" ry="6" fill="#2a2024"/><ellipse cx="116" cy="100" rx="4.5" ry="6" fill="#2a2024"/>
    <circle cx="85.5" cy="98" r="1.6" fill="#fff"/><circle cx="117.5" cy="98" r="1.6" fill="#fff"/>
    <ellipse cx="72" cy="114" rx="8" ry="5" fill="#ff8fb1" fill-opacity=".6"/><ellipse cx="128" cy="114" rx="8" ry="5" fill="#ff8fb1" fill-opacity=".6"/>
    <path d="M88 120q12 12 24 0" stroke="#c2284f" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <g transform="translate(142 128) rotate(14)">
      <rect x="0" y="10" width="26" height="46" rx="13" fill="#f9d0b4"/>
      ${[0,1,2,3].map(i => `<rect x="${i*6.4}" y="${i%2?4:0}" width="5" height="12" rx="2.5" fill="${nail}"/>`).join("")}
    </g></svg>`;
}

const PAL = { // צבעוני ובוהק
  pink: "#ff3d8b", coral: "#ff7a59", purple: "#7b4dff", lilac: "#c8a8ff",
  teal: "#14c8b8", sun: "#ffc531", red: "#e0183f", sky: "#4cc3ff", mint: "#7ee8c0",
};
const BG = {
  pink: ["#ffd0e6", "#ffe7a8"], lilac: ["#e3d4ff", "#ffd0f0"], teal: ["#b8f2ea", "#d4e4ff"],
  sun: ["#ffe9a8", "#ffc8d6"], sky: ["#c4ecff", "#e8d4ff"], coral: ["#ffd9c8", "#ffc2e0"],
};
const five = c => Array(5).fill(c);

const ART = {
  gel:      () => handSVG(five(PAL.pink), "almond", null, BG.pink),
  acrylic:  () => handSVG(five("#fff4ea"), "coffin", PAL.sun, BG.lilac),
  polygel:  () => handSVG([PAL.purple, PAL.lilac, PAL.purple, PAL.lilac, PAL.purple], "square", PAL.sun, BG.teal),
  fill:     () => handSVG(five(PAL.red), "round", null, BG.sun),
  manicure: () => handSVG(five(PAL.coral), "round", "#fff", BG.coral),
  pedicure: () => toesSVG(PAL.pink, "#fff", BG.teal),
};
document.querySelectorAll("[data-art]").forEach(el => el.innerHTML = ART[el.dataset.art]());

const CHARS = {
  heroA: { hair: "#3b1d5a", top: PAL.pink,   bg: BG.pink,  nail: PAL.sun,    label: "זהבית" },
  heroB: { hair: "#c2501f", top: PAL.purple, bg: BG.teal,  nail: PAL.pink,   label: "לקוחה מרוצה" },
  heroC: { hair: "#1d1d2b", top: PAL.teal,   bg: BG.lilac, nail: PAL.purple, label: "לקוחה מרוצה" },
  about: { hair: "#3b1d5a", top: PAL.coral,  bg: BG.sun,   nail: PAL.pink,   label: "זהבית" },
};
document.querySelectorAll("[data-char]").forEach(el => el.innerHTML = characterSVG(CHARS[el.dataset.char]));

const DESIGNS = [
  ["ורוד פופ",       () => handSVG(five(PAL.pink), "coffin", "#fff", BG.pink)],
  ["לילך וזהב",      () => handSVG([PAL.lilac, "#e9dcff", PAL.lilac, "#e9dcff", PAL.lilac], "square", PAL.sun, BG.lilac)],
  ["טורקיז קיצי",    () => handSVG(five(PAL.teal), "almond", "#fff", BG.teal)],
  ["אדום יין",       () => handSVG(five("#a0153a"), "almond", null, BG.coral)],
  ["שמש וכתום",      () => handSVG([PAL.sun, PAL.coral, PAL.sun, PAL.coral, PAL.sun], "round", "#fff", BG.sun)],
  ["תכלת שמיים",     () => handSVG(five(PAL.sky), "coffin", "#fff", BG.sky)],
  ["פדיקור פוקסיה",  () => toesSVG(PAL.pink, "#fff", BG.lilac)],
  ["פדיקור מנטה",    () => toesSVG(PAL.mint, PAL.purple, BG.sun)],
];
document.getElementById("galleryGrid").innerHTML =
  DESIGNS.map(([t, f]) => `<figure>${f()}<figcaption>${t}</figcaption></figure>`).join("");
