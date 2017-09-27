
//instance variables for stats/traits of sprites
//user data
var waveTime = 3;
var gold = 500;
var level = 0;
var lives = 30;
//sprite data
var enemies = [];
var img;
//enemy sprite group
var eSprites;
var bottom;
var exit;
// image data
var animated
var tImage;
var playerLives;

//images to grab prior to the page loading
function preload() {
 animated = loadAnimation("/images/run/24.png","/images/run/31.png");
 img = loadImage("../images/playarea.png");
 tImage = loadImage("/images/tower.png");
}
//one time run of the canvas/ functions
//functions defined in p5 or p5.play must be used in setup or draw
function setup() {

  //create the canvas 900x550
  var canv = createCanvas(900,550);
  //link the canvas to the div #canvasholder
  canv.parent('canvasHolder');
  //create a sprite along the bottom and right of the canvas to act as a wall
  bottom = createSprite(500,550,600,0);
  exit = createSprite(900,250,20,300);


  textSize(32);

  playerLives = text("text",450,50);
  //make it rigid
  bottom.immovable = true;
  exit.immovable = true;
  //enemy sprites group defined here to allow for collider to be used.
  eSprites = new Group();
  
  


	//function to place all enemy sprites on canvas
	function wave(level){
		//loop 10 times to place sprites
		for (let i = 0; i < 10 +(level * 2); i++) {
			//wait 300ms
			setTimeout(function(){
				//new enemy
				let sp = new Enemy();
				//add that sprite to the enemy sprites group
				sp.sprite.addToGroup(eSprites);
				//shoot the sprite onto the canvas and downwards toward the 'exit'
				sp.sprite.setSpeed(sp.speed,sp.direction);
				sp.sprite.life = 385;
				//add the enemy object into the enemies array
				enemies.push(sp);
			},i*300);
		} 	

	}
	//wave countdown timer
	function timer(){
		//every second
		setInterval(function(){
			//deduct the wavetime
				waveTime--;
			// if the wave is out of time, reset the timer and stop the function
			if (waveTime <= 0){
				waveTime = 3;
				return;
			}
		},10000);
	}

	// begins the wave by calling the wave and timer functions and incrementing the level for next call
	// on repeat every 10 seconds.
	function startWaves(){
		setInterval(function(){
			if(lives <= 0) return;
			wave(level);
			timer();
			level++;
		},10000);	
	}
	//first time calls to set up the waves
	timer();
	wave(level);
	//startWaves();

}
function mouseClicked() {
	//can player afford the cost of the tower?
	if (gold > 120){
		//place a tower at the clicked position
		var tower = new Tower(mouseX,mouseY);
		gold = gold - 120;
	}
}
//tower constructor
function Tower(x, y) {
	//range stat, how many pixels away can it fire?
		this.range = 150;
		//how much dmg the tower will do to the enemy's hp
		this.dmg = 5;
		//how fast it can fire, in ms
		this.fireRate = 500;
		//actual sprite on the canvas
		this.sprite = createSprite(x,y,75,75);
		//image for the sprite
		this.sprite.addImage(tImage);
}

//enemey constructor for the waves of enemies
function Enemy(){
		//the actual sprite on screen
		this.sprite = createSprite(10,0,50,50);
		//angle of entry to the canvas
		this.direction = 41;
		//hp stat, how many bullets can it take before removing from canvas
		this.hp = 10;
		//how fast the sprite moves
		this.speed = 3;
		//what the sprite looks like
		this.sprite.addAnimation("running",animated);

}

//function to shoot bullets
function fire(enemyPos){
	//create new bullet sprite

	//get position of nearest enemy

	//send bullet at enemy

}

function draw() {

	//add background to the canvas
	background(img);
	//required to have any sprites appear
  	drawSprites();
  
  	//when enemy sprites hit the bottom, bounce!
  	eSprites.bounce(bottom,function(sprite){
  		//bounce does all the position work for me, 
  		//so I was printing "boing!!" into the console to debug this originally
  		//console.log("Boing!!");
  	});
  	eSprites.collide(exit, function(sprite){
  		sprite.remove();
  		lives--;
  		enemies.shift();

  	})

  	

}














