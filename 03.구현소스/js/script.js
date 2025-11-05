const canvas = document.getElementById("je-gif");
const ctx = canvas.getContext("2d");

const totalFrames = 20;
const frames = [];
let currentFrame = 0;
let isPlaying = true;
let imagesLoaded = 0;
let lastFrameTime = 0;
const frameDelay = 1000 / 6;

canvas.width = 400;
canvas.height = 400;

for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `./img/animation/144ppi/je_ani_${i}.png`;
  img.onload = function () {
    imagesLoaded++;
    if (imagesLoaded === totalFrames) {
      animate(0);
    }
  };
  frames.push(img);
}

function animate(timestamp) {
  if (!isPlaying) return;

  if (timestamp - lastFrameTime >= frameDelay) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);

    currentFrame = (currentFrame + 1) % totalFrames;
    lastFrameTime = timestamp;
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener("mouseenter", function () {
  isPlaying = false;
});

canvas.addEventListener("mouseleave", function () {
  isPlaying = true;
  lastFrameTime = 0;
  requestAnimationFrame(animate);
});

window.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document
      .querySelectorAll("a, canvas, .left-text, .right-text, .scroll-guide")
      .forEach((element) => {
        element.addEventListener("mouseenter", function () {
          cursor.classList.add("active");
        });

        element.addEventListener("mouseleave", function () {
          cursor.classList.remove("active");
        });
      });
  }
});

/* 스크롤 애니메이션 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const worksSection = document.querySelector('.works-section');
    if (worksSection) {
        observer.observe(worksSection);
    }
});
