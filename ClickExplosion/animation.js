const canvas = document.getElementById('explosionCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 2; // Random radius between 2 and 7
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        this.dx = (Math.random() - 0.5) * 4; // Horizontal velocity
        this.dy = (Math.random() - 0.5) * 4; // Vertical velocity
        this.life = 100; // Particle lifespan
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.life -= 2; // Reduce life on each frame
    }
}

// Create explosion on click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (let i = 0; i < 30; i++) { // Generate 30 particles
        particles.push(new Particle(clickX, clickY));
    }
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    particles = particles.filter(particle => particle.life > 0); // Remove dead particles

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate); // Loop animation
}

// Start animation
animate();
