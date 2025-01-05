const canvas = document.getElementById('explosionCanvas');
const ctx = canvas.getContext('2d');

// Shape properties
const shapes = [];
const numShapes = 50;
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFFF33", "#FF33A1"];

// Shape class
class Shape {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 20 + 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2; // Random direction
        this.speed = Math.random() * 3 + 2; // Speed of movement
        this.type = Math.random() > 0.5 ? "circle" : "square"; // Shape type
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.size *= 0.98; // Gradually shrink
    }

    draw() {
        ctx.beginPath();
        if (this.type === "circle") {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
            ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create explosion
function createExplosion() {
    for (let i = 0; i < numShapes; i++) {
        shapes.push(new Shape());
    }
}

// Animate shapes
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape, index) => {
        shape.update();
        shape.draw();

        // Remove shapes that are too small
        if (shape.size < 1) {
            shapes.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Start explosion on click
canvas.addEventListener("click", () => {
    createExplosion();
});

// Start animation loop
animate();
