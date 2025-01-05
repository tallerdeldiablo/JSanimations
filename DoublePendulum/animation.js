const canvas = document.getElementById('pendulumCanvas');
const ctx = canvas.getContext('2d');

// Physics constants
const g = 1; // Gravity

// Pendulum parameters
let pendulum = {
    length1: 200,
    length2: 200,
    mass1: 10,
    mass2: 10,
    angle1: Math.PI / 2, // Initial angle of the first pendulum
    angle2: Math.PI / 4, // Initial angle of the second pendulum
    velocity1: 0,
    velocity2: 0,
};

// Origin position
const originX = canvas.width / 2;
const originY = 200;

// Trace history
let trace = [];

// Update pendulum state
function updatePendulum() {
    const { length1, length2, mass1, mass2, angle1, angle2, velocity1, velocity2 } = pendulum;

    const num1 = -g * (2 * mass1 + mass2) * Math.sin(angle1);
    const num2 = -mass2 * g * Math.sin(angle1 - 2 * angle2);
    const num3 = -2 * Math.sin(angle1 - angle2) * mass2;
    const num4 = velocity2 * velocity2 * length2 + velocity1 * velocity1 * length1 * Math.cos(angle1 - angle2);
    const denominator1 = length1 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2));
    const acceleration1 = (num1 + num2 + num3 * num4) / denominator1;

    const num5 = 2 * Math.sin(angle1 - angle2);
    const num6 = (velocity1 * velocity1 * length1 * (mass1 + mass2)) + g * (mass1 + mass2) * Math.cos(angle1);
    const num7 = velocity2 * velocity2 * length2 * mass2 * Math.cos(angle1 - angle2);
    const denominator2 = length2 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2));
    const acceleration2 = (num5 * (num6 + num7)) / denominator2;

    pendulum.velocity1 += acceleration1;
    pendulum.velocity2 += acceleration2;
    pendulum.angle1 += pendulum.velocity1;
    pendulum.angle2 += pendulum.velocity2;

    pendulum.velocity1 *= 0.99; // Damping
    pendulum.velocity2 *= 0.99; // Damping
}

// Draw the pendulum
function drawPendulum() {
    const { length1, length2, angle1, angle2 } = pendulum;

    const x1 = originX + length1 * Math.sin(angle1);
    const y1 = originY + length1 * Math.cos(angle1);
    const x2 = x1 + length2 * Math.sin(angle2);
    const y2 = y1 + length2 * Math.cos(angle2);

    // Draw arms
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw masses
    ctx.beginPath();
    ctx.arc(x1, y1, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2, y2, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Draw trace
    trace.push({ x: x2, y: y2 });
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    for (let i = 0; i < trace.length - 1; i++) {
        ctx.moveTo(trace[i].x, trace[i].y);
        ctx.lineTo(trace[i + 1].x, trace[i + 1].y);
    }
    ctx.stroke();

    // Limit trace length
    if (trace.length > 200) trace.shift();
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    updatePendulum(); // Update physics
    drawPendulum(); // Draw pendulum
    requestAnimationFrame(animate); // Loop animation
}

// Start animation
animate();
