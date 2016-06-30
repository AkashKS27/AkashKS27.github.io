(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})(); //animation condition
var score;
var x1, x2;

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 1000,
  height = 500,
  //player object
  player = {
    x: 50,
    y: height,
    width: 40,
    height: 50,
    speed1: 3,
    velX: 0,
    velY: 0,
    score: 0,
    jumping: false
  },
  //obstacle object
  obstacle = {
    x1: 300,
    x2: 550,
    x3: 950,
  }

keys = [],
  friction = 0.8,
  gravity = 0.2;

canvas.width = width;
canvas.height = height;
//gameplay funtion 
function update() {
  ctx.clearRect(0, 0, width, height);
  //player
  playimage = new Image();
  if(parseInt(player.score)%2!=0)
  {
  playimage.src="mario1.png";
  }
  else if(parseInt(player.score)%2==0)
  {
    playimage.src="mario2.png"
  }
  ctx.drawImage(playimage, player.x, player.y, player.width, player.height);
  
  //obstacles
  base_image = new Image();
  base_image.src = 'spike4.png';
  ctx.drawImage(base_image, obstacle.x1, 460, 30, 40);
  base_imag = new Image();
  base_imag.src = 'spike1.png';
  ctx.drawImage(base_imag, obstacle.x2, 450, 35, 50);
  base_ima = new Image();
  base_ima.src = 'spike2.png';
  ctx.drawImage(base_ima, obstacle.x3, 440, 40, 60);
  ctx.font = "40px Arial";
  ctx.fillText("score =" +parseInt(player.score), 500, 50);
  //jump condition
  if (keys[38] || keys[32]) {
    // up arrow or space
    document.getElementById('jump').play(); //sound for jump
    if (!player.jumping) {
      player.jumping = true;
      player.velY = -player.speed1 * 2;
    }
  }
  if (player.velX < player.speed) {
    player.velX++;
  }


  player.velX *= friction;

  player.velY += gravity; //conditon to come back down after jumpimg

  player.x += player.velX;
  player.y += player.velY;
  player.score=player.score+0.1;
  if (player.x >= width - player.width) {
    player.x = 0;
  } else if (player.x <= 0) {
    player.x = 0;
  }

  if (player.y >= height - player.height) {
    player.y = height - player.height;
    player.jumping = false;
  }
  if (player.x >= obstacle.x1 && player.x <= obstacle.x1 + 30 && player.y > 410) {

    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 500, 200);
    return;
  }


  if (player.x >= obstacle.x2 && player.x <= obstacle.x2 + 35 && player.y > 400) {
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 500, 200);

    return;
  }
  if (player.x >= obstacle.x3 && player.x <= obstacle.x3 + 40 && player.y > 390) {
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 500, 200);
    return;
  }
  if (player.score <100) {
    if (obstacle.x1 > 0) {
      obstacle.x1 -= 3;
    } else {
      obstacle.x1 = width;
    }
    if (obstacle.x2 > 0) {
      obstacle.x2 -= 3;
    } else {
      obstacle.x2 = width;
    }
    if (obstacle.x3 > 0) {
      obstacle.x3 -= 3;
    } else {
      obstacle.x3 = width;
    }
  }
  //difficulty increased after a score of 1000
  else {
    if (obstacle.x1 > 0) {
      obstacle.x1 -= 6;
    } else {
      obstacle.x1 = width;
    }
    if (obstacle.x2 > 0) {
      obstacle.x2 -= 4.5;
    } else {
      obstacle.x2 = width;
    }
    if (obstacle.x3 > 0) {
      obstacle.x3 -= 3.5;
    } else {
      obstacle.x3 = width;
    }
  }
  /**/
  requestAnimationFrame(update);
  
}
//to check for key press
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;


});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
  update();
});
