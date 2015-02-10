// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (300 - 60) + 60;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 700) {
        this.x = -125;
    }
    var move = this.speed * dt;
    this.x += move;

    this.collision(this, player);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.collision = function(enemy, player) {
    if (enemy.x < player.x + player.width &&
        enemy.x + enemy.width > player.x &&
        enemy.y < player.y + player.height &&
        enemy.height + enemy.y > player.y) {
    // collision detected!
    player.reset();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.hspeed = 101;
    this.vspeed = 83;
}
Player.prototype.update = function(dt) {
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
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
    }
}
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 487;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(Math.random() * (600 - 100) + 100, 60),
    new Enemy(Math.random() * (600 - 100) + 100, 60),
    new Enemy(Math.random() * (600 - 100) + 100, 143),
    new Enemy(Math.random() * (600 - 100) + 100, 226),
    new Enemy(Math.random() * (600 - 100) + 100, 309)
    ];

var player = new Player(303, 487);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
