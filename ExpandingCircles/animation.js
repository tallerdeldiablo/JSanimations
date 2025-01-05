const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

let circles = [];

// Circle class
class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 1;
        this.growthRate = Math.random() * 2 + 1; // Speed of expansion
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.radius += this.growthRate; // Expand radius
        this.opacity -= 0.02; // Fade out
    }
}

// Add new circle on click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    circles.push(new Circle(clickX, clickY));
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles = circles.filter(circle => circle.opacity > 0); // Remove faded circles

    circles.forEach(circle => {
        circle.update();
        circle.draw();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();
