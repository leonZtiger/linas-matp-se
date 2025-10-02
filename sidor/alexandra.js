const photos = document.querySelectorAll(".photos img");
let photoIndex = 0;

function showPhoto(index) {

    if(index >= photos.length) {
        photoIndex = 0;
    } else if(index < 0) {
        photoIndex = photos.length - 1;
    }

    photos.forEach(photo => {
        photo.classList.remove("displayPhoto");
    });
    photos[photoIndex].classList.add("displayPhoto");
}

function backPhoto() {
    photoIndex--;
    showPhoto(photoIndex);
}

function nextPhoto() {
    photoIndex++;
    showPhoto(photoIndex);
}