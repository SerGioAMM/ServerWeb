const MIN_GRID_SIZE = 20;
const MAX_PIXEL_SIZE = 40;

const themes = [
    {
        name: 'celeste',
        bgGradient: 'linear-gradient(to bottom right, #e0f2fe, #bae6fd)',
        sectionBg: 'linear-gradient(to bottom right, #7dd3fc, #38bdf8)',
        cardBg: 'linear-gradient(to bottom right, #bae6fd, #7dd3fc)',
        textColor: '#075985',
        pixelColor: 'rgba(56, 189, 248, 0.3)',
        pixelShadow: 'rgba(56, 189, 248, 0.5)',
        textShadow: '#bae6fd'
    },
    {
        name: 'verde',
        bgGradient: 'linear-gradient(to bottom right, #dcfce7, #bbf7d0)',
        sectionBg: 'linear-gradient(to bottom right, #86efac, #4ade80)',
        cardBg: 'linear-gradient(to bottom right, #bbf7d0, #86efac)',
        textColor: '#166534',
        pixelColor: 'rgba(74, 222, 128, 0.3)',
        pixelShadow: 'rgba(74, 222, 128, 0.5)',
        textShadow: '#bbf7d0'
    },
    {
        name: 'rojo',
        bgGradient: 'linear-gradient(to bottom right, #fee2e2, #fecaca)',
        sectionBg: 'linear-gradient(to bottom right, #fca5a5, #ef4444)',
        cardBg: 'linear-gradient(to bottom right, #fca5a5, #ef4444)',
        textColor: '#7f1d1d',
        pixelColor: 'rgba(220, 38, 38, 0.3)',
        pixelShadow: 'rgba(220, 38, 38, 0.5)',
        textShadow: '#fca5a5'
    },
    {
        name: 'naranja',
        bgGradient: 'linear-gradient(to bottom right, #ffedd5, #fed7aa)',
        sectionBg: 'linear-gradient(to bottom right, #fdba74, #fb923c)',
        cardBg: 'linear-gradient(to bottom right, #fed7aa, #fdba74)',
        textColor: '#9a3412',
        pixelColor: 'rgba(251, 146, 60, 0.3)',
        pixelShadow: 'rgba(251, 146, 60, 0.5)',
        textShadow: '#fed7aa'
    },
    {
        name: 'grisNegro',
        bgGradient: 'linear-gradient(to bottom right, #E5E5EA, #AAAAAA)',
        sectionBg: 'linear-gradient(to bottom right, #CCCCCC, #999999)',
        cardBg: 'linear-gradient(to bottom right, #999999, #CCCCCC)',
        textColor: '#333333',
        pixelColor: 'rgba(0, 0, 0, 0.3)',
        pixelShadow: 'rgba(0, 0, 0, 0.5)',
        textShadow: '#CCCCCC'
    },
    {
        name: 'morado',
        bgGradient: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff)',
        sectionBg: 'linear-gradient(to bottom right, #d8b4fe, #a855f7)',
        cardBg: 'linear-gradient(to bottom right, #e9d5ff, #d8b4fe)',
        textColor: '#6b21a8',
        pixelColor: 'rgba(168, 85, 247, 0.3)',
        pixelShadow: 'rgba(168, 85, 247, 0.5)',
        textShadow: '#e9d5ff'
    },
    {
        name: 'turquesa',
        bgGradient: 'linear-gradient(to bottom right, #ccfbf1, #99f6e4)',
        sectionBg: 'linear-gradient(to bottom right, #5eead4, #14b8a6)',
        cardBg: 'linear-gradient(to bottom right, #99f6e4, #5eead4)',
        textColor: '#115e59',
        pixelColor: 'rgba(20, 184, 166, 0.3)',
        pixelShadow: 'rgba(20, 184, 166, 0.5)',
        textShadow: '#99f6e4'
    },
    {
        name: 'azulOscuro',
        bgGradient: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)',
        sectionBg: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
        cardBg: 'linear-gradient(to bottom right, #bfdbfe, #60a5fa)',
        textColor: '#1e40af',
        pixelColor: 'rgba(59, 130, 246, 0.3)',
        pixelShadow: 'rgba(59, 130, 246, 0.5)',
        textShadow: '#bfdbfe'
    }
      
      
];

let gridSize = MIN_GRID_SIZE;
let pixels = Array(MIN_GRID_SIZE * MIN_GRID_SIZE).fill(false);
let theme = themes[0];

function setTheme(newTheme) {
    theme = newTheme;
    document.body.style.background = theme.bgGradient;
    document.body.style.color = theme.textColor;
    document.querySelector('#aboutMe').style.background = theme.sectionBg;
    document.querySelectorAll('.pixel-art-text').forEach(el => {
        el.style.textShadow = `2px 2px 0 ${theme.textShadow}`;
    });
    document.querySelectorAll('.project, .skill-card .skill-bar').forEach(el => {
        el.style.backgroundColor = `${theme.pixelColor}`;
        el.style.borderColor = `${theme.pixelShadow}`;
    });
}

function updateGridSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxDimension = Math.max(width, height);
    gridSize = Math.max(MIN_GRID_SIZE, Math.floor(maxDimension / MAX_PIXEL_SIZE));
    pixels = Array(gridSize * gridSize).fill(false);
    renderPixelGrid();
}

function renderPixelGrid() {
    const pixelGrid = document.getElementById('pixelGrid');
    pixelGrid.innerHTML = '';
    pixelGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    pixelGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixelGrid.appendChild(pixel);
    }
}

function handleMouseMove(e) {
    const offsetY = 1; // Ajustar valor para el desplazamiento deseado
    const gridContainer = document.querySelector('.pixel-grid');
    const rect = gridContainer.getBoundingClientRect();

    // Calcular la posición relativa del mouse
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top + offsetY;

    // Calcular la posición en el grid
    const x = Math.floor((relativeX / rect.width) * gridSize);
    const y = Math.floor((relativeY / rect.height) * gridSize);

    // Asegurarse de que x e y estén dentro de los límites del contenedor
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        const index = y * gridSize + x;
        
        if (!pixels[index]) {
            pixels[index] = true;
            const pixelElement = document.querySelectorAll('.pixel')[index];
            if (pixelElement) {
                pixelElement.style.backgroundColor = theme.pixelColor;
                pixelElement.style.boxShadow = `0 0 10px ${theme.pixelShadow}`;
            }
        }
    }
}

function randomizePixels() {
    pixels = pixels.map(() => Math.random() > 0.981);
    document.querySelectorAll('.pixel').forEach((pixel, index) => {
        if (pixels[index]) {
            pixel.style.backgroundColor = theme.pixelColor;
            pixel.style.boxShadow = `0 0 10px ${theme.pixelShadow}`;
        } else {
            pixel.style.backgroundColor = 'transparent';
            pixel.style.boxShadow = 'none';
        }
    });
}



function initializePortfolio() {
    setTheme(themes[Math.floor(Math.random() * themes.length)]);
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    window.addEventListener('mousemove', handleMouseMove);
    setInterval(randomizePixels, 2000);
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar el formulario
            this.reset();
        });
    }
}

window.addEventListener('load', initializePortfolio);