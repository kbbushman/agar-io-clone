const io = require('../servers').io;
const Orb = require('./classes/Orb');

const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
}

initGame();

io.sockets.on('connect', socket => {
  let player = {};
  // Player has connected
  socket.on('init', data => {
    // add player to the game namespace
    socket.join('game');
    // Make plyerConfig object
    let playerConfig = new PlayerConfig(settings);
    // Make plyerData object
    let playerData = new PlayerData(data.playerName, settings);
    console.log('PLAYER DATA', playerData);
    // Make master player object to hold both
    player = new Player(socket.id, playerConfig, playerData);
    // console.log(player);

    setInterval(() => {
      // console.log('PLayers Array =================== ', players)
      io.to('game').emit('tock', {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33); // 30 33's in 1000ms, or 1 of 30fps
    
    socket.emit('initReturn', {
      orbs
    });
    players.push(playerData);

  });


  // Client sent tick, passing the direction to move player
  socket.on('tick', data => {
    // console.log('SERVER TICK ================================', data)
    let speed = player.playerConfig.speed;
    // Update the playerConfig object with the new direction in data
    // at the same time, create a local variable for this callback and readability
    let xV = player.playerConfig.xVector = data.xVector;
    let yV = player.playerConfig.yVector = data.yVector;

    // If player location is within page boundaries, move player towards mouse
    if ((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)) {
        player.playerData.locY -= speed * yV;
    } else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)) {
        player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
  })
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
