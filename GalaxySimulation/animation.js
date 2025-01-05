const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

// Particle properties
const numParticles = 500;
const particles = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Particle class
class Particle {
    constructor() {
        this.angle = Math.random() * Math.PI * 2; // Random angle
        this.distance = Math.random() * 300; // Distance from the center
        this.speed = Math.random() * 0.02 + 0.01; // Rotation speed
        this.size = Math.random() * 2 + 1; // Particle size
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    }

    update() {
        this.angle += this.speed; // Rotate the particle
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;

        // Gradually move in and out
        this.distance += Math.sin(this.angle * 0.5) * 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize particles
function initParticles() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Start the simulation
initParticles();
animate();
