const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let fireworks = [];

// Particle class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1; // Particle size
        this.color = color;
        this.dx = (Math.random() - 0.5) * 8; // Horizontal velocity
        this.dy = (Math.random() - 0.5) * 8; // Vertical velocity
        this.life = 100; // Lifespan of the particle
        this.opacity = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.opacity -= 0.01; // Fade out
        this.life -= 1;
    }
}

// Firework class
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };

        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(x, y, this.color));
        }
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }

    update() {
        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => particle.life > 0);
    }
}

// Add a firework on click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    fireworks.push(new Firework(clickX, clickY));
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        // Remove firework if all particles have faded
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Start the animation
animate();
