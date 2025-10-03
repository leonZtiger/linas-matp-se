axios.get('projects.json')
    .then(response => {

        const projects = response.data;
        const container = document.getElementById('projectContainer');
        const grid = document.getElementById('searchContainer');

        const searchWrapper = document.createElement('div');
        searchWrapper.classList.add('searchWr');

        const searchInput = document.createElement('input');
        searchInput.classList.add('search-in');
        searchInput.placeholder = 'Sökord...';
        searchWrapper.appendChild(searchInput);

        const searchBtn = document.createElement('button');
        searchBtn.innerHTML = `🔍︎`;
        searchBtn.classList.add('search-btn');
        searchWrapper.appendChild(searchBtn);

        const filterBtn = document.createElement('button');
        filterBtn.innerHTML = `Sortera A-Ö`;
        filterBtn.classList.add('filterBtn');
        searchWrapper.appendChild(filterBtn);

        const rensaBtn = document.createElement('button');
        rensaBtn.innerHTML = `<b>X</b>`;
        rensaBtn.classList.add('rBtn');
        searchWrapper.appendChild(rensaBtn);

        grid.appendChild(searchWrapper);

        const projectButtons = [];

        function createProject(project) {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            container.appendChild(projectDiv);

            const projectButton = document.createElement('button');
            projectButton.classList.add('accordion');
            projectButton.innerHTML = `<b>${project.name}</b>`;
            projectDiv.appendChild(projectButton);

            projectButtons.push({
                titelName: project.name,
                description: project.description,
                customer: project.customer,
                otherInfo: project.otherInformation,
                button: projectButton
            });

            const panel = document.createElement('div');
            panel.classList.add('panel');
            panel.style.display = 'none';
            panel.innerHTML = `
        <p><b>${project.name}</b></p>
        <p>${project.description}</p>
        <p>Kund: ${project.customer}</p>
        <p>Övrig information: ${project.otherInformation}</p>`;
            projectDiv.appendChild(panel);

            projectButton.addEventListener('click', () => {
                if (panel.style.display === 'none') {
                    
                    panel.style.display = 'block';
                } else {
                    
                    panel.style.display = 'none';
                }
            });

            const closeButton = document.createElement('button');
            closeButton.classList.add('close-btn');
            closeButton.innerHTML = `<b>X</b>`;
            closeButton.addEventListener('click', () => {
                panel.style.display = 'none';
                projectButtons.forEach(({ button }) => {
                    button.style.borderColor = "";
                });
                searchInput.value = "";
            });
            panel.appendChild(closeButton);

            //min slideshow
            const slideContainer = document.createElement('div');
            slideContainer.classList.add('slideshow');
            panel.appendChild(slideContainer);

            let currentImg = 0;
            const img = document.createElement('img');
            if (project.image && project.image.length > 0) {
                img.src = 'bilder/' + project.image[currentImg];
            } else {
                img.src = '';
            }
            img.classList.add('slideImg');
            slideContainer.appendChild(img);

            const imgCounter = document.createElement('div');
            imgCounter.classList.add('img-counter');
            slideContainer.appendChild(imgCounter);
            imgCounter.innerText = `${currentImg + 1} / ${(project.image.length)}`;

            const prevBtn = document.createElement('button');
            prevBtn.innerText = '←';
            prevBtn.classList.add('slide-btn', 'left');
            prevBtn.addEventListener('click', () => {
                if (currentImg > 0) {
                    currentImg = (currentImg - 1)
                    img.src = 'bilder/' + project.image[currentImg];
                    imgCounter.innerText = `${currentImg + 1} / ${project.image.length}`;
                }
            });

            const nextBtn = document.createElement('button');
            nextBtn.innerText = '→';
            nextBtn.classList.add('slide-btn', 'right');
            nextBtn.addEventListener('click', () => {
                currentImg = (currentImg + 1) % project.image.length;
                img.src = 'bilder/' + project.image[currentImg];
                imgCounter.innerText = `${currentImg + 1} / ${project.image.length}`;

            });

            slideContainer.appendChild(prevBtn);
            slideContainer.appendChild(nextBtn);
        }

        projects.forEach(project => createProject(project));

        searchBtn.addEventListener('click', () => {
            const searchValue = searchInput.value.trim().toLowerCase();
            let found = false;
            projectButtons.forEach(({ titelName, description, customer, otherInfo, button }) => {
                if (searchValue !== "" &&
                    (titelName.toLowerCase().includes(searchValue) ||
                        description.toLowerCase().includes(searchValue) ||
                        customer.toLowerCase().includes(searchValue) ||
                        otherInfo.toLowerCase().includes(searchValue))
                ) {
                    button.style.borderColor = '#ff4d6d';
                    found = true;
                } else {
                    button.style.borderColor = "";
                }
            });
            if (!found && searchValue !== "") {
                alert('Inga projekt matchar sökordet!');
            }
        })

        // Sortera 
        filterBtn.addEventListener('click', () => {
            projects.sort((a, b) => (a.name).localeCompare(b.name));
            container.innerHTML = "";
            projectButtons.length = 0;
            projects.forEach(project => createProject(project));
        })

        // Rensa
        rensaBtn.addEventListener('click', () => {
            searchInput.value = "";
            projectButtons.forEach(({ button }) => {
                button.style.borderColor = "";
            })
        })

    })