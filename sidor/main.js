

// adds defualt content like the footer and header
function loadContent() {

    loadHeader()

    fetch("./footer.html")
        .then(res => res.text())
        .then(html => { document.getElementById("footer").innerHTML = html; })
        .catch(err => console.error("Footer load failed:", err));
}

async function loadHeader() {
    const file = await fetch("./header.html")
    const header = document.getElementById("header");

    header.innerHTML = await file.text();

    // add event handlers
    const checkbox = header.querySelector('#hamburger');
    const navbar = header.querySelector('#mobileNav');

    function handleMenu(open) {
        if (open) {
            navbar.className = "open-mobile"
        } else {
            navbar.className = "closed-mobile"
        }
    }

    // Toggle on click
    checkbox.addEventListener('change', () => handleMenu(checkbox.checked));
}


