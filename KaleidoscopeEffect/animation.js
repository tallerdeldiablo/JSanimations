const canvas = document.getElementById('kaleidoCanvas');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

let angle = 0;
const numSlices = 12; // Number of mirrored segments

function drawKaleidoscope() {
  ctx.clearRect(0, 0, w, h);

  const radius = 250;
  const centerX = w / 2;
  const centerY = h / 2;

  ctx.save();
  ctx.translate(centerX, centerY);

  for (let i = 0; i < numSlices; i++) {
    ctx.save();
    ctx.rotate((2 * Math.PI / numSlices) * i);

    if (i % 2 === 0) {
      ctx.scale(1, 1);
    } else {
      ctx.scale(1, -1); // Mirror every other slice
    }

    drawPattern(radius);
    ctx.restore();
  }

  ctx.restore();
}

function drawPattern(r) {
  ctx.save();
  ctx.rotate(angle);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const x = Math.cos(i + angle * 2) * r * Math.sin(i + angle);
    const y = Math.sin(i + angle * 3) * r * Math.cos(i + angle * 0.5);
    ctx.fillStyle = `hsl(${(angle * 100 + i * 36) % 360}, 100%, 60%)`;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function animate() {
  angle += 0.01;
  drawKaleidoscope();
  requestAnimationFrame(animate);
}

animate();
