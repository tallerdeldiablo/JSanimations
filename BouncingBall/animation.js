const canvas = document.getElementById('bouncingCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2, // Horizontal speed
    dy: 2, // Vertical speed
    color: 'blue'
};

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Update the ball's position
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bounce off the walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1; // Reverse horizontal direction
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; // Reverse vertical direction
    }

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    drawBall();

    requestAnimationFrame(update); // Keep the animation running
}

// Start the animation
update();
