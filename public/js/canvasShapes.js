// =========================================
// =================DRAWING=================
// =========================================

// Set Random Starting Point
// player.locX = Math.floor(500 * Math.random() + 100);
// player.locY = Math.floor(500 * Math.random() + 100);

// Draw Orbs
function draw() {
  // Reset the translation back to default
  context.setTransform(1,0,0,1,0,0);
  // Clear screen before drawing new shape. Creates 'movement' instead of lines
  context.clearRect(0,0,canvas.width, canvas.height);

  // Clamp camera (view port) to player
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;
  // Translate allows us to move the canvas around
  context.translate(camX, camY);

  // Draw all players
  players.forEach(p => {
    // console.log('P ==============================', p)
    context.beginPath();
    context.fillStyle = p.color;
    context.arc(p.locX, p.locY, 10, 0, Math.PI * 2);
    // context.arc(200, 200, 10, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(255,0,0)';
    context.stroke();
  });

  orbs.forEach(orb => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

// Detect Mouse Position
canvas.addEventListener('mousemove', event => {
  // console.log(event);
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  };


  const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;

  if (angleDeg >= 0 && angleDeg < 90) {
    console.log('Mouse is in the lower right quadrant...');
    xVector = 1 - (angleDeg/90);
    yVector = -(angleDeg/90);
  } else if(angleDeg >= 90 && angleDeg <= 180) {
    console.log('Mouse is in the lower left quadrant...');
    xVector = -(angleDeg-90)/90;
    yVector = -(1 - ((angleDeg-90)/90));
  } else if(angleDeg >= -180 && angleDeg < -90) {
    console.log('Mouse is in the upper left quadrant...');
    xVector = (angleDeg+90)/90;
    yVector = (1 + ((angleDeg+90)/90));
  } else if(angleDeg < 0 && angleDeg >= -90) {
    console.log('Mouse is in the upper right quadrant...');
    xVector = (angleDeg+90)/90;
    yVector = (1 - ((angleDeg+90)/90));
  }

  player.xVector = xVector;
  player.yVector = yVector;
  console.log(player)
});
