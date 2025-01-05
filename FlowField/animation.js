const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');

// Parameters
const particles = [];
const numParticles = 500;
const fieldSize = 50;
const flowField = [];
const fieldStrength = 0.5;
const noiseSpeed = 0.01;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.angle = 0;
        this.history = [];
    }

    update() {
        const col = Math.floor(this.x / fieldSize);
        const row = Math.floor(this.y / fieldSize);
        const index = col + row * Math.floor(canvas.width / fieldSize);

        if (flowField[index]) {
            this.angle = flowField[index];
        }

        const dx = Math.cos(this.angle) * this.speed;
        const dy = Math.sin(this.angle) * this.speed;

        this.x += dx;
        this.y += dy;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Record history for trails
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 10) this.history.shift();
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.history[0]?.x || this.x, this.history[0]?.y || this.y);

        this.history.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.stroke();
    }
}

// Initialize flow field
function createFlowField() {
    for (let y = 0; y < canvas.height; y += fieldSize) {
        for (let x = 0; x < canvas.width; x += fieldSize) {
            const angle = Math.random() * Math.PI * 2;
            flowField.push(angle);
        }
    }
}

// Animate particles
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize
function init() {
    createFlowField();
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    animate();
}

init();
