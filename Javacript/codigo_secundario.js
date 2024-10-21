const MIN_GRID_SIZE = 20;
const MAX_PIXEL_SIZE = 40;
const TRAIL_LENGTH = 5;

let gridSize = MIN_GRID_SIZE;
let pixels = [];

function updateGridSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxDimension = Math.max(width, height);
    gridSize = Math.max(MIN_GRID_SIZE, Math.floor(maxDimension / MAX_PIXEL_SIZE));
    
    const pixelGrid = document.getElementById('pixelGrid');
    pixelGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    pixelGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

function handleMouseMove(e) {
    const x = Math.floor((e.clientX / window.innerWidth) * gridSize);
    const y = Math.floor((e.clientY / window.innerHeight) * gridSize);
    const index = y * gridSize + x;

    pixels = [{ index, opacity: 0.3 }, ...pixels.slice(0, TRAIL_LENGTH - 1)];
    updatePixels();
}

function updatePixels() {
    const pixelGrid = document.getElementById('pixelGrid');
    pixelGrid.innerHTML = '';

    pixels.forEach((pixel, i) => {
        const pixelElement = document.createElement('div');
        pixelElement.className = 'pixel';
        pixelElement.style.gridColumn = (pixel.index % gridSize) + 1;
        pixelElement.style.gridRow = Math.floor(pixel.index / gridSize) + 1;
        pixelElement.style.opacity = pixel.opacity;
        pixelGrid.appendChild(pixelElement);
    });
}

function fadePixels() {
    pixels = pixels.map(pixel => ({
        ...pixel,
        opacity: pixel.opacity > 0 ? pixel.opacity - 0.05 : 0
    })).filter(pixel => pixel.opacity > 0);

    updatePixels();
}

window.addEventListener('resize', updateGridSize);
window.addEventListener('mousemove', handleMouseMove);

updateGridSize();
setInterval(fadePixels, 50);