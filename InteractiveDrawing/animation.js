const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false; // Track if the mouse is pressed
let particles = []; // Store the particles for the drawing effect

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1; // Random size
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        this.speedX = (Math.random() - 0.5) * 2; // Random horizontal movement
        this.speedY = (Math.random() - 0.5) * 2; // Random vertical movement
        this.life = 100; // Lifespan of the particle
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Add particle at mouse position
function createParticle(x, y) {
    particles.push(new Particle(x, y));
}

// Mouse event listeners
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    createParticle(mouseX, mouseY);
});

// Animation loop
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Create a fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => particle.life > 0); // Remove dead particles

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();
