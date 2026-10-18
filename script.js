// ===== הגדרות (אפשר לעדכן כאן מחירים, משכי זמן ושעות) =====
const WHATSAPP = "972525622662";
const SERVICES = {
  gel:      { name: "בניית ג'ל",       price: 220, mins: 120 },
  acrylic:  { name: "בניית אקריל",     price: 250, mins: 150 },
  polygel:  { name: "בניית פולי-ג'ל",  price: 250, mins: 150 },
  fill:     { name: "מילוי ותחזוקה",   price: 160, mins: 90  },
  manicure: { name: "מניקור",          price: 100, mins: 60  },
  pedicure: { name: "פדיקור",          price: 130, mins: 75  },
};
// יום בשבוע (0=ראשון) -> [פתיחה, סגירה] בשעות. שבת סגור.
const HOURS = { 0:[9,21], 1:[9,21], 2:[9,21], 3:[9,21], 4:[9,21], 5:[9,14] };
const STEP = 30; // דקות בין התחלות אפשריות

// ===== עזרים =====
const $ = id => document.getElementById(id);
const fmt = m => String(Math.floor(m/60)).padStart(2,"0") + ":" + String(m%60).padStart(2,"0");
const store = {
  get(){ try { return JSON.parse(localStorage.getItem("zehavit-booked")||"{}"); } catch { return {}; } },
  set(v){ try { localStorage.setItem("zehavit-booked", JSON.stringify(v)); } catch {} }
};
let chosen = null;

document.querySelectorAll("[data-price]").forEach(el => el.textContent = SERVICES[el.dataset.price].price);
$("service").innerHTML = '<option value="">בחרו טיפול…</option>' +
  Object.entries(SERVICES).map(([k,s]) => `<option value="${k}">${s.name} · ${s.mins} דק׳ · ${s.price} ₪</option>`).join("");

const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
$("date").min = today.toISOString().slice(0,10);

function renderSlots(){
  chosen = null; updateSummary();
  const sv = SERVICES[$("service").value], date = $("date").value, box = $("slots");
  if (!sv || !date) { box.textContent = "בחרו טיפול ותאריך"; return; }
  const d = new Date(date + "T00:00");
  const h = HOURS[d.getDay()];
  if (!h) { box.textContent = "ביום שבת הסטודיו סגור, בחרו יום אחר."; return; }
  const taken = store.get()[date] || [];
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const nowMin = now.getHours()*60 + now.getMinutes();
  box.innerHTML = "";
  for (let s = h[0]*60; s + sv.mins <= h[1]*60; s += STEP) {
    const clash = taken.some(t => s < t.end && s + sv.mins > t.start);
    const b = document.createElement("button");
    b.type = "button"; b.className = "slot"; b.textContent = fmt(s);
    b.disabled = clash || (isToday && s <= nowMin);
    b.onclick = () => {
      box.querySelectorAll(".slot").forEach(x => x.classList.remove("on"));
      b.classList.add("on"); chosen = s; updateSummary();
    };
    box.append(b);
  }
  if (!box.children.length) box.textContent = "אין שעות פנויות בטיפול ארוך זה ביום הזה.";
}

function updateSummary(){
  const sv = SERVICES[$("service").value];
  $("summary").textContent = sv && chosen !== null
    ? `${sv.name} · ${fmt(chosen)}–${fmt(chosen+sv.mins)} · ${sv.price} ₪` : "";
}

$("service").onchange = $("date").onchange = renderSlots;

$("bookForm").onsubmit = e => {
  e.preventDefault();
  const sv = SERVICES[$("service").value], date = $("date").value;
  if (!sv || !date || chosen === null) { $("summary").textContent = "יש לבחור טיפול, תאריך ושעה"; return; }
  const all = store.get();
  (all[date] = all[date] || []).push({ start: chosen, end: chosen + sv.mins });
  store.set(all);
  const [y, m, dd] = date.split("-");
  const msg = `שלום זהבית, אשמח לקבוע תור:\nטיפול: ${sv.name}\nתאריך: ${dd}/${m}/${y}\nשעה: ${fmt(chosen)}\nשם: ${$("name").value}\nטלפון: ${$("phone").value}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  renderSlots();
};
