const canvas = document.getElementById('je-gif');
const ctx = canvas.getContext('2d');

const totalFrames = 20;
const frames = [];
let currentFrame = 0;
let isPlaying = true;
let imagesLoaded = 0;
let lastFrameTime = 0;
const frameDelay = 1000 / 7;

canvas.width = 400;
canvas.height = 400;

for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `./img/animation/144ppi/je_ani_${i}.png`;
    img.onload = function() {
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

canvas.addEventListener('mouseenter', function() {
    isPlaying = false;
});

canvas.addEventListener('mouseleave', function() {
    isPlaying = true;
    lastFrameTime = 0;
    requestAnimationFrame(animate);
});