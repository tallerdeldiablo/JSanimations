const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');

// Simulated frequency data
const bufferLength = 128; // Number of bars
let dataArray = new Uint8Array(bufferLength);

function generateRandomData() {
    for (let i = 0; i < bufferLength; i++) {
        dataArray[i] = Math.floor(Math.random() * 200); // Random values between 0 and 255
    }
}

let frameCount = 0;

function drawVisualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        ctx.fillStyle = `rgb(${barHeight + 50}, 100, 200)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    // Throttle data updates
    if (frameCount % 2.5 === 0) { // Update data every 5 frames
        generateRandomData();
    }
    frameCount++;

    requestAnimationFrame(drawVisualizer);
}


// Start the visualization
drawVisualizer();
