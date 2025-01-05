const canvas = document.getElementById('clothCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // Number of points in the grid
const spacing = 20; // Distance between points
const damping = 0.98; // Damping to slow motion
const stiffness = 0.1; // Spring stiffness
const gravity = 0.5; // Gravity effect

// Points in the grid
let points = [];

// Initialize grid points
for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
        points.push({
            x: x * spacing + canvas.width / 4,
            y: y * spacing + canvas.height / 4,
            oldX: x * spacing + canvas.width / 4,
            oldY: y * spacing + canvas.height / 4,
            fixed: y === 0 && (x === 0 || x === gridSize - 1), // Fix top corners
        });
    }
}

// Connections (springs)
let connections = [];
for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
        const index = y * gridSize + x;
        if (x < gridSize - 1) connections.push([index, index + 1]); // Horizontal
        if (y < gridSize - 1) connections.push([index, index + gridSize]); // Vertical
    }
}

// Update point positions
function updatePoints() {
    points.forEach(point => {
        if (point.fixed) return;

        const velocityX = (point.x - point.oldX) * damping;
        const velocityY = (point.y - point.oldY) * damping;

        point.oldX = point.x;
        point.oldY = point.y;

        point.x += velocityX;
        point.y += velocityY + gravity; // Gravity effect
    });
}

// Constrain connections (simulate springs)
function constrainConnections() {
    connections.forEach(([a, b]) => {
        const pointA = points[a];
        const pointB = points[b];

        const dx = pointB.x - pointA.x;
        const dy = pointB.y - pointA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const difference = (distance - spacing) / distance;

        const offsetX = dx * stiffness * difference;
        const offsetY = dy * stiffness * difference;

        if (!pointA.fixed) {
            pointA.x += offsetX;
            pointA.y += offsetY;
        }
        if (!pointB.fixed) {
            pointB.x -= offsetX;
            pointB.y -= offsetY;
        }
    });
}

// Draw points and connections
function drawCloth() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.beginPath();
    connections.forEach(([a, b]) => {
        const pointA = points[a];
        const pointB = points[b];
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
    });
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Draw points
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = point.fixed ? 'red' : 'white';
        ctx.fill();
    });
}

// Animation loop
function animate() {
    updatePoints();
    constrainConnections();
    drawCloth();
    requestAnimationFrame(animate);
}

// Start animation
animate();
