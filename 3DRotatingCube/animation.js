const canvas = document.getElementById('cubeCanvas');
const ctx = canvas.getContext('2d');

// Cube points (3D coordinates)
const points = [
    { x: -1, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: 1, y: 1, z: -1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: -1, y: 1, z: 1 },
];

// Cube edges (pairs of point indices)
const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
];

// Rotation variables
let angleX = 0;
let angleY = 0;

// Project 3D point to 2D
function project(point) {
    const distance = 2; // Camera distance
    const fov = 200; // Field of view
    const scale = fov / (distance - point.z);
    return {
        x: point.x * scale + canvas.width / 2,
        y: point.y * scale + canvas.height / 2,
    };
}

// Rotate point around the X axis
function rotateX(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
    };
}

// Rotate point around the Y axis
function rotateY(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
    };
}

// Draw the cube
function drawCube() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const transformedPoints = points.map(point => {
        let rotatedPoint = rotateX(point, angleX);
        rotatedPoint = rotateY(rotatedPoint, angleY);
        return project(rotatedPoint);
    });

    edges.forEach(([start, end]) => {
        const p1 = transformedPoints[start];
        const p2 = transformedPoints[end];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    angleX += 0.01;
    angleY += 0.01;

    requestAnimationFrame(drawCube);
}

// Start the animation
drawCube();
