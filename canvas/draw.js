var cvs = document.getElementById('cvs');

let screenRatio = 1;

function determineOpponentColour(noOfWins, noOfLosses, cooldown){
  const majorityWin = noOfWins > noOfLosses;
  const colourDiff = Math.abs(noOfWins - noOfLosses) < 50 ? noOfWins - noOfLosses : majorityWin ? 50 : -50;
  let hueValue = 350 - colourDiff;
  if(hueValue > 360){
    hueValue = hueValue - 360;
  }
  const satValue = cooldown <= 0 ? 100 : 40;
  const lightValue = cooldown <= 0 ? 80 : 60;

  return "hsl(" + hueValue + ","+ satValue +"%," + lightValue + "%)"
}

function Draw() {

  const userDefaultColor = "#dfc12a";

  this.resize = function(){
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    screenRatio = windowWidth / windowHeight;

    cvs.height = windowHeight;
    cvs.width = windowWidth;
    cvs.style.height = windowHeight + "px";
    cvs.style.width = windowWidth + "px";
    document.getElementById('canvas-container').style.height = windowHeight + "px";
    document.getElementById('canvas-container').style.width = windowWidth + "px";
  }

  this.clearCanvas = function(){
      new Canvas(cvs).clear();
  }

  this.drawPlayersAndObjectiveNoTarget = function(homeX, homeY, playerX, playerY, opponentX, opponentY, playerCooldown, opponentCooldown, noOfWins, noOfLosses){
      var width = cvs.width;
      var height = cvs.height;

      const firstX = width * homeX;
      const firstY = height * homeY;
      const secondX = width * playerX;
      const secondY = height * playerY;
      const thirdX = width * opponentX;
      const thirdY = height * opponentY;
      const tinyCircleRadius = height/60;
      const smallCircleRadius = height/35;
      const largeCircleRadius = height/23;
      const playerColor = playerCooldown <= 0 ? userDefaultColor : "rgb(100, 100, 0)";
      const opponentColor = determineOpponentColour(noOfWins, noOfLosses, opponentCooldown);
      const normalLineThickness = 1;
      const extraThickLine = 7;

      const canvas = new Canvas(cvs);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/1.2, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/1.5, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/4, extraThickLine,false,true);
      canvas.setColor("fill", opponentColor).setColor("stroke", "blue").circle(thirdX, thirdY,smallCircleRadius, normalLineThickness,true,false);
      canvas.setColor("fill", "grey").setColor("stroke", "purple").circle(thirdX, thirdY,tinyCircleRadius, extraThickLine/1.5,false,true);
      canvas.setColor("fill", playerColor).setColor("stroke", "green").circle(secondX, secondY,smallCircleRadius, normalLineThickness,true,false);
      canvas.setColor("fill", "black").setColor("stroke", "green").circle(secondX, secondY,tinyCircleRadius, normalLineThickness,true,false);
  }

  this.drawPlayersAndObjectiveWithTarget = function(homeX, homeY, playerX, playerY, opponentX, opponentY, targetX, targetY, playerCooldown, opponentCooldown, noOfWins, noOfLosses){

      var width = cvs.width;
      var height = cvs.height;

      const firstX = width * homeX;
      const firstY = height * homeY;
      const secondX = width * playerX;
      const secondY = height * playerY;
      const thirdX = width * opponentX;
      const thirdY = height * opponentY;
      const fourthX = width * targetX;
      const fourthY = height * targetY;
      const tinyCircleRadius = height/60;
      const smallCircleRadius = height/35;
      const largeCircleRadius = height/23;
      const playerColor = playerCooldown <= 0 ? userDefaultColor : "rgb(100, 100, 0)";
      const opponentColor = determineOpponentColour(noOfWins, noOfLosses, opponentCooldown);
      const normalLineThickness = 1;
      const extraThickLine = 7;

      const canvas = new Canvas(cvs);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/1.2, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/1.5, extraThickLine,false,true);
      canvas.setColor("fill", "brown").setColor("stroke", "brown").circle(firstX,firstY,largeCircleRadius/4, extraThickLine,false,true);
      canvas.setColor("fill", "white").setColor("stroke", "red").circle(fourthX, fourthY,smallCircleRadius, normalLineThickness,false,true);
      canvas.setColor("stroke", "red").line(fourthX, fourthY + smallCircleRadius, fourthX, fourthY + smallCircleRadius/2);
      canvas.setColor("stroke", "red").line(fourthX, fourthY - smallCircleRadius, fourthX, fourthY - smallCircleRadius/2);
      canvas.setColor("stroke", "red").line(fourthX + smallCircleRadius, fourthY, fourthX + smallCircleRadius/2, fourthY);
      canvas.setColor("stroke", "red").line(fourthX - smallCircleRadius, fourthY, fourthX - smallCircleRadius/2, fourthY);
      canvas.setColor("fill", opponentColor).setColor("stroke", "blue").circle(thirdX, thirdY,smallCircleRadius, normalLineThickness,true,false);
      canvas.setColor("fill", "grey").setColor("stroke", "purple").circle(thirdX, thirdY,tinyCircleRadius, extraThickLine/1.5,false,true);
      canvas.setColor("fill", playerColor).setColor("stroke", "green").circle(secondX, secondY,smallCircleRadius, normalLineThickness,true,false);
      canvas.setColor("fill", "black").setColor("stroke", "green").circle(secondX, secondY,tinyCircleRadius, normalLineThickness,true,false);
  }

  this.drawFinish = function(homeOriginX, homeOriginY, finishTimer, finishTimerDuration, gameResultWin, gameResultLoss, noOfWins, noOfLosses){
    var width = cvs.width;
    var height = cvs.height;

    const largestDimension = width > height ? width : height;

    const largeCircleRadius = largestDimension * (finishTimer / finishTimerDuration);
    const firstX = homeOriginX * width;
    const firstY = homeOriginY * height;
    const color = gameResultWin ? userDefaultColor : gameResultLoss ? determineOpponentColour(noOfWins, noOfLosses, 0) : "grey";
    const normalLineThickness = 1;

    const canvas = new Canvas(cvs);
    canvas.setColor("fill", color).setColor("stroke", color).circle(firstX,firstY,largeCircleRadius, normalLineThickness,true,true);
    canvas.setColor("fill", color).setColor("stroke", color).circle(firstX,firstY,largeCircleRadius + 1, normalLineThickness,true,true);
    canvas.setColor("fill", color).setColor("stroke", color).circle(firstX,firstY,largeCircleRadius + 2, normalLineThickness,true,true);
    canvas.setColor("fill", color).setColor("stroke", color).circle(firstX,firstY,largeCircleRadius + 3, normalLineThickness,true,true);
  }

  this.drawGenerationText = function(inputGen){
    var width = cvs.width;
    var height = cvs.height;

    const canvas = new Canvas(cvs);
    const leftMargin = height/35;
    const topMargin = height/15;
    canvas.textDraw("Generation: " + inputGen, leftMargin, topMargin, "black");
  }

  this.drawPregameOverlayText = function(overlayTimerValue, overlayTimerColorValue){
    var width = cvs.width;
    var height = cvs.height;

    if(overlayTimerValue < 1){
      overlayTimerValue = 1;
    }

    const canvas = new Canvas(cvs);
    canvas.textDrawBig(overlayTimerValue, width/2, height/2, "rgb(" + 255*overlayTimerColorValue + ", " + 255*overlayTimerColorValue + ", "+ 255*overlayTimerColorValue + ")");
  }

  this.canvasCoordinatesToCanvasRatio = function(coords){
    var width = cvs.width;
    var height = cvs.height;

    return [coords[0]/width, coords[1]/height]
  }

}

const resizeDraw = new Draw();
resizeDraw.resize();
window.addEventListener("resize", resizeDraw.resize);
