//----------------
// GAME_CONSTANTS
//----------------
var CHAR_WIDTH = 70,
    CHAR_HEIGHT = 70,
    H_SPEED = 101,
    V_SPEED = 83,
    OOB_RIGHT = 700,
    OOB_LEFT = -125;

//---------------
// gameVariables
//---------------
var score = 0,
    lives = 3,
    posY = [60, 143, 226, 309], // An Array of Y positions for gems
    posX = [0, 101, 202, 303, 404, 505, 606, 707], // An Array of X positions for gems
    randX = posX[Math.floor(Math.random() * 7)],
    randY = posY[Math.floor(Math.random() * 4)],
    gotGem = false,
    gameOver = false,
    gemSprites = ['images/Gem Orange.png', // An Array of gem sprites
    'images/Gem Blue.png',
    'images/Gem Green.png'];

//-----------------
// ACTOR PROTOTYPE
//-----------------
var Actor = function(x, y){
    this.x = x;
    this.y = y;
    this.width = CHAR_WIDTH;
    this.height = CHAR_HEIGHT;
}
Actor.prototype.update = function(dt) {
}
// draw the actor on the screen
Actor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//---------
// ENEMIES
//---------
var Enemy = function(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    Actor.call(this, x, y);
    this.speed = Math.random() * (300 - 60) + 60;
    this.width = CHAR_WIDTH;
    this.height = CHAR_WIDTH;
}
Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position using dt (time delta between) ticks
Enemy.prototype.update = function(dt) {
    //when the enemy moves out of bounds on right edge
    //put him back on the left
    if (this.x > OOB_RIGHT) {
        this.x = OOB_LEFT;
    }
    // multiply movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var move = this.speed * dt;
    this.x += move;
    //run collision method to check collision with player
    this.collision(this, player);
}
// Collision detection method
//TODO - figure out how to reduce duplication of this code
Enemy.prototype.collision = function(enemy, player) {
    if (enemy.x < player.x + player.width &&
        enemy.x + enemy.width > player.x &&
        enemy.y < player.y + player.height &&
        enemy.height + enemy.y > player.y) {
    // collision detected, player loses life
    player.death();
    }
}

//----------
// PRINCESS
//----------
var Princess = function(x, y) {
    Actor.call(this, x, y);
    this.width = CHAR_WIDTH;
    this.height = CHAR_HEIGHT;
    this.sprite = 'images/char-cat-girl.png';
}
Princess.prototype = Object.create(Actor.prototype);
Princess.prototype.constructor = Princess;
Princess.prototype.update = function(dt) {
    this.collision(this, player);
}
Princess.prototype.collision = function(princess, player) {
    if (princess.x < player.x + player.width &&
        princess.x + princess.width > player.x &&
        princess.y < player.y + player.height &&
        princess.height + princess.y > player.y) {
        //check if a gem has been collected
        if (gotGem) {
            // player gets points
            player.bonus();
        } else {
            // player gets sent home
            player.reset();
        }
        // reset gem status.  player needs more gems
        gotGem = false;
        console.log(gotGem);
    }
}

//--------
// PLAYER
//--------
var Player = function(x, y) {
    Actor.call(this, x, y);
    this.sprite = 'images/char-boy.png';
    // player moves in jumps of one block per turn
    this.hspeed = H_SPEED;
    this.vspeed = V_SPEED;
    this.width = CHAR_WIDTH;
    this.height = CHAR_HEIGHT;
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > 50) {
                this.x -= this.hspeed;
            }
            break;
        case 'right':
            if (this.x < 550) {
                this.x += this.hspeed;
            }
            break;
        case 'up':
            if (this.y > 50) {
                this.y -= this.vspeed;
            } else {
                this.reset();
            }
            break;
        case 'down':
            if (this.y < 450) {
                this.y += this.vspeed;
            }
            break;
        case 'pause':
            active = false;
            console.log('Pause');
            break;
    }
}
// Action to take on player's death
Player.prototype.death = function() {
    // Take away a life
    lives--;
    // Update the status board
    statusboard.message = "Lives: " + lives + " -- Score: " + score;;
    // Return player to the start
    this.reset();
    // Set gem status back to default
    gem.itemReset();
    // If too many deaths then lose the game
    if (lives < 1) {
        this.lostGame();
    }
}
// Action to take when player reaches the princess with a gem
Player.prototype.bonus = function() {
    //TODO - add a life
    // Reset gem status to default
    gem.itemReset();
    // Increase score by 10
    score = score+10;
    // Update status board
    statusboard.message = "Lives: " + lives + " -- Score: " + score;
    // Return player to the start
    this.reset();
    // If you get 5 gems you have won
    if (score == 50) {
        this.wonGame();
    }
}
// Set player back to start
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 487;
    this.sprite = 'images/char-boy.png';
}
// Action to take when player wins
Player.prototype.wonGame = function() {
    // Let user know they won the game
    statusboard.message = "YOU WIN";
    this.gameOver();
}
// Action to take when player loses
Player.prototype.lostGame = function() {
    // Let user know they lost the game
    statusboard.message = "GAME OVER";
    this.gameOver();
}
// Game Over
Player.prototype.gameOver = function() {
    gameOver = true
    // Move player to start position
    this.reset();
    //Stop player from moving
    //document.removeEventListener('keyup', passKeyUpValue);
    // Remove the enemies
    allEnemies = [];
}

//------
// GEMS
//------
var Gem = function(sprite) {
    this.width = CHAR_WIDTH;
    this.height = CHAR_HEIGHT;
    this.sprite = sprite;
    this.itemReset(); // Sets the random position of a gem
}
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Gem.prototype.update = function() {
    this.collision(this, player);
}
Gem.prototype.collision = function(gem, player) {
    if (gem.x < player.x + player.width &&
        gem.x + gem.width > player.x &&
        gem.y < player.y + player.height &&
        gem.height + gem.y > player.y) {
    // collision detected!
    gotGem = true;
    console.log(gotGem);
    this.x = 1000;
    this.y = 1000;
    //player 'collects' gem
    player.sprite = 'images/gem-boy.png';
    }
}
Gem.prototype.itemReset = function() {
    // Resets the item on the map where player can grab it
    this.x = randX;
    this.y = randY;
}

//-------------------
// statusboard class
//-------------------

// Display lives and messages
var Statusboard = function() {
    this.message = "Lives: " + lives + " -- Score: " + score;
}
// Update the statusboard
Statusboard.prototype.update = function() {
    statusboardElement.innerHTML = this.message;
}

//---------------------
// instantiate objects
//---------------------
var allEnemies = [
    new Enemy(posX[Math.floor(Math.random() * 7)], 60),
    new Enemy(posX[Math.floor(Math.random() * 7)], 60),
    new Enemy(posX[Math.floor(Math.random() * 7)], 143),
    new Enemy(posX[Math.floor(Math.random() * 7)], 226),
    new Enemy(posX[Math.floor(Math.random() * 7)], 309)
    ];

var princess = new Princess(303, -8, 'images/char-cat-girl.png');

var player = new Player(303, 487);

var gem = new Gem('images/Gem Orange.png');

var statusboard = new Statusboard();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause'
    };
    if (!gameOver) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
