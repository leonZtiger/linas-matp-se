

// adds defualt content like the footer and header
function loadContent() {

    loadHeader();
    loadFooter();

    document.title = "Linas matpåse";
}

async function  loadFooter(params) {
    
    const file = await fetch("./footer.html");
    const footer = document.getElementById("footer");

    footer.innerHTML = await file.text();
}

async function loadHeader() {
    // Fetch file
    const file = await fetch("./header.html")
    const header = document.getElementById("header");

    header.innerHTML = await file.text();

    // add event handlers, must use query selector as header content is loaded dynamicly.
    const checkbox = header.querySelector('#hamburger');
    const navbar = header.querySelector('#mobileNav');

    function handleMenu(open) {
        if (open) {
            navbar.className = "open-mobile"
        } else {
            navbar.className = "closed-mobile"
        }
    }

    // toggle menu on click
    checkbox.addEventListener('change', () => handleMenu(checkbox.checked));
}


