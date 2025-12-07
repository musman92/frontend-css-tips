const items = document.querySelectorAll(".item");
const progress = document.querySelector(".progress");
let active = 0;
let timer;

function resetProgressBar() {
  // Turn off transition
  progress.style.transition = "none";
  progress.style.width = "0%";

  // Force browser to apply it
  void progress.offsetWidth;

  // Turn on transition
  progress.style.transition = "width 3s linear";
  progress.style.width = "100%";
}


function updateCarousel() {
  items.forEach((item, i) => item.className = "item");

  const left1 = (active - 1 + items.length) % items.length;
  const left2 = (active - 2 + items.length) % items.length;
  const right1 = (active + 1) % items.length;
  const right2 = (active + 2) % items.length;

  items[active].classList.add("active");
  items[left1].classList.add("left");
  items[left2].classList.add("left-2");
  items[right1].classList.add("right");
  items[right2].classList.add("right-2");

  // Restart progress animation correctly
  resetProgressBar();
}


updateCarousel();

document.querySelector(".left-btn").onclick = () => {
  active = (active - 1 + items.length) % items.length;
  updateCarousel();
};

document.querySelector(".right-btn").onclick = () => {
  active = (active + 1) % items.length;
  updateCarousel();
};


// Auto-slide
function autoSlide() {
  active = (active + 1) % items.length;
  updateCarousel();
}

timer = setInterval(autoSlide, 3000);