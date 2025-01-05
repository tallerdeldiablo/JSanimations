const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

// Fractal Tree Parameters
const maxDepth = 10; // Maximum depth of recursion
const branchLength = 100; // Initial branch length
const angleVariance = Math.PI / 6; // Angle variation for branches
const lengthShrink = 0.7; // Shrinking factor for each branch level

// Draw a branch
function drawBranch(x, y, length, angle, depth) {
    if (depth > maxDepth) return;

    const endX = x + length * Math.cos(angle);
    const endY = y - length * Math.sin(angle);

    // Draw the branch
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `hsl(${depth * 36}, 100%, 50%)`; // Color changes with depth
    ctx.lineWidth = maxDepth - depth + 1;
    ctx.stroke();

    // Recursively draw smaller branches
    drawBranch(endX, endY, length * lengthShrink, angle - angleVariance, depth + 1);
    drawBranch(endX, endY, length * lengthShrink, angle + angleVariance, depth + 1);
}

// Start the tree animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const bottomY = canvas.height;

    drawBranch(centerX, bottomY, branchLength, -Math.PI / 2, 0); // Start with the trunk
}

// Animate continuously
animate();
