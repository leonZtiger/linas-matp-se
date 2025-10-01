let currentSlide = 0;
const slides = document.querySelectorAll('.slides');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slides[currentSlide].style.display = 'block';
}

document.getElementById('prevBtn').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

showSlide(currentSlide);

// Hämta och visa projekt-data
axios.get('/fredriksProjekt/projekt.json') 
  .then(response => {
    const data = response.data;
    const container = document.getElementById('textContentContainer');
    container.innerHTML = '';

    data.forEach(projekt => {
      const card = document.createElement('div');
      card.classList.add('projekt-card');

      card.innerHTML = `
        <h3>${projekt.titel}</h3>
        <p><strong>Kund:</strong> ${projekt.kund}</p>
        <p>${projekt.beskrivning}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Kunde inte hämta projekten:', error);
  });