// All player data
class Player {
  constructor(socketId, playerConfig, playerData) {
    this.socketId = socketId;
    this.playerConfig = playerConfig;
    this.playerData = playerData;
    console.log(playerConfig.xVector)
  }
}

module.exports = Player;
