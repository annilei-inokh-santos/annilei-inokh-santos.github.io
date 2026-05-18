/* ════════════════════════════════════════
   game-blog-script.js
   MAIN INTERACTIVITY - Uses GAMES from game-details-script.js
════════════════════════════════════════ */

let activeGenre = "all";
let searchQuery = "";
let currentPanel = "games";

function renderTiles() {
  const grid = document.getElementById("gameGrid");
  const empty = document.getElementById("emptyState");

  grid.querySelectorAll(".game-tile").forEach(t => t.remove());

  const filtered = GAMES.filter(g => {
    const matchGenre = activeGenre === "all" || g.genres.includes(activeGenre);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || g.name.toLowerCase().includes(q) || g.tags.some(t => t.includes(q));
    return matchGenre && matchSearch;
  });

  document.getElementById("visibleCount").textContent = filtered.length;

  if (filtered.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  filtered.forEach((g, i) => {
    const tile = document.createElement("div");
    tile.className = "game-tile";
    tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", "View details for " + g.name);
    tile.dataset.id = g.id;
    tile.style.animationDelay = (i * 0.04) + "s";

    tile.innerHTML = `
      <img class="tile-thumb" src="${g.thumb}" alt="${g.name} thumbnail" loading="lazy">
      <span class="tile-badge badge-all">All Ages</span>
      <button class="tile-fav" aria-label="Favourite" onclick="toggleFav(event,'${g.id}')">
        <i class="fas fa-star"></i>
      </button>
      <div class="tile-body">
        <p class="tile-name">${g.name}</p>
        <span class="tile-meta"><i class="fas fa-calendar-alt" style="font-size:10px"></i> ${g.date}</span>
      </div>
    `;

    tile.addEventListener("click", e => {
      if (e.target.closest(".tile-fav")) return;
      openModal(g);
    });

    tile.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(g); }
    });

    grid.insertBefore(tile, empty);
  });
}

function openModal(g) {
  document.getElementById("modalThumb").src = g.thumb;
  document.getElementById("modalThumb").alt = g.name;
  document.getElementById("modalTitle").textContent = g.name;
  document.getElementById("modalCreator").innerHTML =
    `Created ${g.date} · by <a href="${g.creatorUrl}" target="_blank">${g.creator}</a>`;
  document.getElementById("modalRating").innerHTML =
    `<i class="fas fa-shield-alt"></i> ${g.rating} · ${g.content}`;
  document.getElementById("modalTags").innerHTML =
    g.tags.map(t => `<span class="modal-tag">${t}</span>`).join("");
  document.getElementById("modalDesc").textContent = g.desc;
  document.getElementById("modalNote").textContent = g.note;
  document.getElementById("modalPlayBtn").href = g.url;

  document.getElementById("modalBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(e) {
  if (e.target === document.getElementById("modalBackdrop")) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModalDirect();
});

function filterGenre(genre) {
  activeGenre = genre;
  renderTiles();
}

function filterGenreChip(genre, btn) {
  activeGenre = genre;
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderTiles();
}

function handleSearch() {
  searchQuery = document.getElementById("searchInput").value;
  renderTiles();
}

function switchPanel(panel, btn) {
  currentPanel = panel;

  document.querySelectorAll(".content-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("panel-" + panel).classList.add("active");

  document.querySelectorAll(".nav-link[data-panel], .snack-btn[data-panel]")
    .forEach(b => b.classList.remove("active"));
  document.querySelectorAll(`[data-panel="${panel}"]`)
    .forEach(b => b.classList.add("active"));

  const filterSectionLabel = document.getElementById("filterSectionLabel");
  const filterButtons = document.getElementById("filterButtons");
  const filterBar = document.getElementById("filterBar");
  
  if (panel === "games") {
    if (filterSectionLabel) filterSectionLabel.classList.remove("hidden");
    if (filterButtons) filterButtons.classList.remove("hidden");
    if (filterBar) filterBar.style.display = "flex";
  } else {
    if (filterSectionLabel) filterSectionLabel.classList.add("hidden");
    if (filterButtons) filterButtons.classList.add("hidden");
    if (filterBar) filterBar.style.display = "none";
  }
}

document.getElementById("sidebarToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

function toggleFav(e, id) {
  e.stopPropagation();
  const tile = document.querySelector(`.game-tile[data-id="${id}"]`);
  if (tile) tile.classList.toggle("fav");
}

document.addEventListener("DOMContentLoaded", () => {
  const filterBar = document.getElementById("filterBar");
  if (filterBar) filterBar.style.display = "flex";
});

renderTiles();