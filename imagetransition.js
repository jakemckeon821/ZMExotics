const collection = document.querySelectorAll('.img-collection');
let currentIndex = 0;
const totalGroups = collection.length;
const fadeDuration = 1000;
const displayDuration = 3000;

function showNextGroup() {
    collection[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % totalGroups;

    setTimeout(() => {
        collection[currentIndex].classList.add('active');
    }, fadeDuration);
}

collection[currentIndex].classList.add('active');

setInterval(showNextGroup, displayDuration + fadeDuration);