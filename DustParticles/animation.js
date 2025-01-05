const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');

const particles = [];
const numParticles = 100;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // Small radius
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`; // Light, semi-transparent color
        this.dx = (Math.random() - 0.5) * 0.5; // Horizontal velocity
        this.dy = (Math.random() - 0.5) * 0.5; // Vertical velocity
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

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
}

// Initialize particles
function initParticles() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Draw and update particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Start simulation
initParticles();
animate();
