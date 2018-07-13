/* 
 * Classes & Functions
 */
// Active Character - Parent class
class ActiveCharacter {
    constructor(sprite, x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks    
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // This metod will be implemented directly in each child class since is going
        // to be different between them 
    }

    // Draw the active character on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies the player must avoid - Active Character's child class
class Enemy extends ActiveCharacter {
    constructor(sprite, x, y, speed) {
        // Call parent constructor
        super(sprite, x, y);
        this.speed = speed;
        //this.sprite = 'images/enemy-bug.png';
    }

    // Enermy's position update
    update(dt) {
        if (this.x < 500)
            this.x += this.speed * dt;
        else{
            // resets x direction off screen.
            // calculate a reset for this.
            // canvas.width = 505 | canvas.height = 606;
            this.x = -2;
            this.y = Math.random() * 184 + 50;
        }

        // Check if a collision exists between the player and the enemies characters
        checkCollision();
    }
    
    // Draw the enemy on the screen, required method for game
    render() {
        super.render();
    }
}

// Enemies the player must avoid - Active Character's child class
class Player extends ActiveCharacter {
    constructor(sprite, x, y, speed = 50) {
        // Call parent constructor
        super(sprite, x, y);
        this.speed = speed;
    }

    // Player's position update
    update(dt) {
        // The player's position only updates with the canvas when an input is given
    }
    
    // Draw the enemy on the screen, required method for game
    render() {
        super.render();
    }

    // Handle the player's movement based on the direction inputted by the user
    handleInput(direction) {
        switch (direction) {
            case 'left':
                if (this.x > 0)
                    this.x -= this.speed;
                else
                    this.x = 400;
                break;
            case 'right':
                if (this.x < 400)
                    this.x += this.speed;
                else
                    this.x = 0;
                break;
            case 'up':
                // Resets player's to its starting position each time it gets to the water.
                if (this.y < 40)
                    this.reset();
                else 
                    this.y -= this.speed;
                break;
            case 'down':
                if (this.y < 400)
                    this.y += this.speed;
        }
    }
    
    // Player reset back to original position
    reset() {
        this.x = 200;
        this.y = 400;
    }
}

// Check for possible collisions
var checkCollision = function() {
    // If the player reachs enemy proximity by 40px in all directions, execute the following
    for (var i = 0; i < allEnemies.length; i++)
        if (Math.abs(player.x - allEnemies[i].x) <= 40)
            if (Math.abs(player.y - allEnemies[i].y) <= 40)
                player.reset();
};




/* 
 * Global variables declaration
 */
allEnemies = [];            // Array grouping all the enemies
// Instantiate a player character
var player = new Player('images/char-boy.png', 200, 400);
// Instantiate all the enemy characters
for (var i = 0; i < 6; i++) {
    var enemy = new Enemy('images/enemy-bug.png', -2, Math.random() * 184 + 50, Math.random() * 256);
    allEnemies.push(enemy);
}




/* 
 * Event Listeners
 */
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
