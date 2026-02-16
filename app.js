const nav = document.getElementById("nav");
const panelRoot = document.getElementById("panelRoot");
const audio = document.getElementById("audio");
const vinyl = document.getElementById("vinyl");
const control = document.getElementById("vinylControl");

let playing = false;
let activePanel = null;

/* VINYL CONTROL */
control.onclick = () => {
  playing = !playing;
  control.textContent = playing ? "⏸" : "▶";
  vinyl.style.animationPlayState = playing ? "running" : "paused";
  playing ? audio.play() : audio.pause();
};

/* PANEL SPAWNER */
function spawnPanel(btn, item) {
  killPanel();

  const rect = btn.getBoundingClientRect();
  const panel = document.createElement("div");
  panel.className = "panel";

  panel.style.left = rect.right + 20 + "px";
  panel.style.top = rect.top + "px";

  panel.innerHTML =
    `<h4>${item.name}</h4>` +
    item.sub.map(s => `<p>${s}</p>`).join("");

  panelRoot.appendChild(panel);
  activePanel = panel;
}

function killPanel() {
  if (activePanel) {
    activePanel.remove();
    activePanel = null;
  }
}

/* LOAD DATA */
fetch("data/content.json")
  .then(r => r.json())
  .then(data => {

    title.textContent = data.title;
    tagline.textContent = data.tagline;
    quote.textContent = data.quote;

    data.nav.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item.name;

      btn.onmouseenter = () => spawnPanel(btn, item);
      btn.onclick = () => spawnPanel(btn, item);

      nav.appendChild(btn);
    });
  });

/* CLICK AWAY */
document.addEventListener("click", e => {
  if (!e.target.closest(".panel") && !e.target.closest(".nav")) {
    killPanel();
  }
});
