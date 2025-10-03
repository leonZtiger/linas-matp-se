// Byt sökvägar till dina egna bilder
const GALLERY = [
    "./bilder/bengt/brod.png",
    "./bilder/bengt/frukt.png",
    "./bilder/bengt/dryck.png",
    "./bilder/bengt/mejeri.png",
    "./bilder/bengt/snacks.png"
];

function initBengt() {
    initCarousel();
    animateSkill(92); // Ändra procentsats här (0–100)
    initProjects();   // Laddar JSON och renderar
    setupSortControl();
}


let idx = 0; // aktuell bild

function initCarousel() {
    const img = document.getElementById('carImg');
    const prev = document.getElementById('btnPrev');
    const next = document.getElementById('btnNext');
    if (!img || !prev || !next) return;

    // visar första bilden
    setImage(0);

    // klick vänster/höger
    prev.addEventListener('click', () => setImage(idx - 1));
    next.addEventListener('click', () => setImage(idx + 1));

    // piltangenter
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') setImage(idx - 1);
        if (e.key === 'ArrowRight') setImage(idx + 1);
    });

    // fallback om fil saknas
    img.onerror = () => { img.onerror = null; img.src = FALLBACK; };
}

// sätter bilden, wrappar index med modulo
function setImage(newIndex) {
    const img = document.getElementById('carImg');
    if (!img || GALLERY.length === 0) return;
    const n = GALLERY.length;
    idx = ((newIndex % n) + n) % n;   // enkel modulo
    const src = (GALLERY[idx] && GALLERY[idx].trim()) ? GALLERY[idx] : FALLBACK;
    img.src = src;
}



function animateSkill(percent) {
    const bar = document.getElementById('skillBar');
    const label = document.getElementById('skillLabel');
    const clamped = Math.max(0, Math.min(100, percent)); // håller inom 0–100
    requestAnimationFrame(() => {
        bar.style.width = clamped + "%";
        if (label) label.textContent = `Order Picking Skill: ${clamped}%`;
    });
}


let PAST_WORK = []; // lagrar data från JSON

async function initProjects() {
    try {
        const res = await fetch('./bengt.json', { cache: 'no-store' });
        PAST_WORK = await res.json();
    } catch (e) {
        PAST_WORK = [];
    }
    renderProjects(getSortOrder());
}

// Returnerar valt sorteringsläge
function getSortOrder() {
    const select = document.getElementById('sortOrder');
    return select ? select.value : 'desc';
}

// Kopplar sorteringsmenyn
function setupSortControl() {
    const select = document.getElementById('sortOrder');
    if (!select) return;
    select.addEventListener('change', (e) => {
        renderProjects(e.target.value);
    });
}

// Renderar projektkorten
function renderProjects(order = 'desc') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    const items = [...PAST_WORK].sort((a, b) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return order === 'asc' ? da - db : db - da;
    });
    grid.innerHTML = items.map(item => `
        <article class="project-card">
            <img src="${item.image}" alt="${item.title}">
            <div class="project-body">
                <h3 class="project-title">${item.title}</h3>
                <div class="project-meta">
                    ${item.client} · ${item.date}
                </div>
                <p class="project-desc">${item.summary}</p>
            </div>
        </article>
    `).join("");
}

// Enkel datumformatering
function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    } catch {
        return iso;
    }
}
