const canvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');

const text = "EXPLODE!";
const particles = [];
const particleSize = 2;
const particleSpeed = 2;

// Draw the text on the canvas
function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Extract text pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createParticles(imageData);
}

// Create particles from text pixels
function createParticles(imageData) {
    const data = imageData.data;
    for (let y = 0; y < canvas.height; y += particleSize) {
        for (let x = 0; x < canvas.width; x += particleSize) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3]; // Check if pixel is not transparent
            if (alpha > 128) {
                particles.push({
                    x,
                    y,
                    dx: (Math.random() - 0.5) * particleSpeed,
                    dy: (Math.random() - 0.5) * particleSpeed,
                    color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`,
                });
            }
        }
    }
}

// Animate the particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;
    });

    requestAnimationFrame(animateParticles);
}

// Initialize
drawText();
animateParticles();
