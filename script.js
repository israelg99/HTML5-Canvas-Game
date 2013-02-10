
// Main JS File of the HTML5 Canvas Game

window.onload = function() {

"use strict";
	
	// Block Size
	var BlockSize = 25;
	var BlockSizeDivine = 6;
	
	// Getting Canvas Details
	var canvas = document.getElementById("Game");
	var ctx = canvas.getContext("2d");
	canvas.setAttribute("width", canvas.getAttribute("width") / BlockSize * BlockSize);
	canvas.setAttribute("height", canvas.getAttribute("height") / BlockSize * BlockSize);
	var canvas_height = canvas.getAttribute("height");
	var canvas_width = canvas.getAttribute("width");
	
	// MS delay between frames
	var ms = 1000/60; // 1000/60 = 16 = 60 frames per second
	
	// Setting Blocks Variables
	var grass = new Block('res/blocks/grass.jpg', BlockSize);
	var water = new Block('res/blocks/water.jpg', BlockSize);
	
	// Map
	var map = new Map(0,0,60,60); // The 2D Map Array
	
	// Map Mask Size - Height, Width -- I made that variables to fix the "BoundsLoad" bug and to make the game still flexiable.
	var mapMask_Height = canvas_height/BlockSize; // To fix a bug, "BoundsLoad" Bug.
	var mapMask_Width = canvas_width/BlockSize; // To fix a bug, "BoundsLoad" Bug.
	
	// Player
	var PlayerSizeW = 70, PlayerSizeH = 100
	var Player = new Player((canvas_width/2 - PlayerSizeW) / BlockSizeDivine * BlockSizeDivine, (canvas_height/2 - PlayerSizeH / 2) / BlockSizeDivine * BlockSizeDivine, (canvas_width/2 - PlayerSizeW) / BlockSizeDivine * BlockSizeDivine, (canvas_height/2 - PlayerSizeH / 2) / BlockSizeDivine * BlockSizeDivine, PlayerSizeW, PlayerSizeH, "right", 12, 24);
	var PlayerStep = 0;
	var PlayerRun = 0;
	
	var clearTicks = 0;
	var activeTicks = 0;
	var toActive = 3;
	
	var StepFlip = true;
	
	var keysDown = {}; // JSON Awesome Algro!!!!!!!!! Better than Array, Normal Variable ETC!
	var keys = {
		"up" : 87,
		"right" : 68,
		"down" : 83,
		"left" : 65,
		"sprint" : 16
	};
	
	keysDown[keys.up] = false;
	keysDown[keys.right] = false;
	keysDown[keys.down] = false;
	keysDown[keys.left] = false;
	
	setInterval(function() {  // The GAME LOOP.
	
		// Loops thourgh the 2D Map Array, and DrawBlocks of the map to the screen.
		var mapMask = map.Screen(mapMask_Width, mapMask_Height, map.x, map.y);
		for(var i = 0; i < mapMask.length; i++) {
			for(var j = 0; j <mapMask[0].length; j++) {
				switch(mapMask[i][j]) {
					case "grass":
						grass.DrawBlock(ctx,j*BlockSize,i*BlockSize);
					break;
					case "water":
						water.DrawBlock(ctx,j*BlockSize,i*BlockSize);
					break;
				}
			}
		}
		
		console.log("x : " + Player.PositionX);
		console.log("y : " + Player.PositionY);
		
		if(!Player.isRunning) {
			if(PlayerStep > 0) {
				Player.Draw_PlayerStep(ctx, PlayerStep);
			} else {
				Player.Draw_PlayerStand(ctx);
			}
		} else {
			console.log("SSS");
			Player.Draw_PlayerRun(ctx, PlayerRun);
		}
		
		// Check if the user pressed a key, and if he did, it returns which key is pressed
		document.onkeydown = getKey;
		
			if(keysDown[keys.up]) {
				if(Player.PositionY > 7) {
					activeTicks++;
					clearTicks = 0;
					
					if(activeTicks >= toActive) {
						if(map.y > 0 && Player.PlayerDefaultPosY == Player.PositionY) {
							map.y -= 0.5;
						} else {
							Player.PositionY -= Player.isRunning ? Player.RunSpeed : Player.Speed;
						}
						
						if(!Player.isRunning) {
							PlayerStep = StepFlip == true ? PlayerStep + 1 : PlayerStep - 1;
							if(PlayerStep >= 4) { StepFlip = false; PlayerStep = 4; }
							if(PlayerStep <= 0) { StepFlip = true; PlayerStep = 1; }
						} else {
							PlayerRun = StepFlip == true ? PlayerRun + 1 : PlayerRun - 1;
							if(PlayerRun >= 6) { StepFlip = false; PlayerRun = 6; }
							if(PlayerRun <= 0) { StepFlip = true; PlayerRun = 1; }
						}
						
						activeTicks = 0;
					}
				}
			}
			
			else if(keysDown[keys.right]) {
				if(Player.PositionX < canvas_width - Player.PlayerSizeW - 3) {
					activeTicks++;
					clearTicks = 0;
					Player.Flip = "right";
					
					if(activeTicks >= toActive) {
						if(map.map[0].length > map.x && map.x + 1 + canvas_width/BlockSize <= map.map[0].length && Player.PlayerDefaultPosX + 24 > Player.PositionX && Player.PlayerDefaultPosX - 24 < Player.PositionX) {
							map.x += Player.isRunning ? 1 : 0.5;
						} else {
							Player.PositionX += Player.isRunning ? Player.RunSpeed : Player.Speed;
						}
						
						if(!Player.isRunning) {
							PlayerStep = StepFlip == true ? PlayerStep + 1 : PlayerStep - 1;
							if(PlayerStep >= 4) { StepFlip = false; PlayerStep = 4; }
							if(PlayerStep <= 0) { StepFlip = true; PlayerStep = 1; }
						} else {
							PlayerRun = StepFlip == true ? PlayerRun + 1 : PlayerRun - 1;
							if(PlayerRun >= 6) { StepFlip = false; PlayerRun = 6; }
							if(PlayerRun <= 0) { StepFlip = true; PlayerRun = 1; }
						}
						
						activeTicks = 0;
					}
				}
			}
			
			else if(keysDown[keys.down]) {
				if(Player.PositionY < canvas_height - Player.PlayerSizeH - 3) {
					activeTicks++;
					clearTicks = 0;
					
					if(activeTicks >= toActive) {
						if(map.y + mapMask_Height < map.map.length && Player.PlayerDefaultPosY == Player.PositionY) {
							map.y += 0.5;
						} else {
							Player.PositionY += Player.isRunning ? Player.RunSpeed : Player.Speed;
						}
						
						if(!Player.isRunning) {
							PlayerStep = StepFlip == true ? PlayerStep + 1 : PlayerStep - 1;
							if(PlayerStep >= 4) { StepFlip = false; PlayerStep = 4; }
							if(PlayerStep <= 0) { StepFlip = true; PlayerStep = 1; }
						} else {
							PlayerRun = StepFlip == true ? PlayerRun + 1 : PlayerRun - 1;
							if(PlayerRun >= 6) { StepFlip = false; PlayerRun = 6; }
							if(PlayerRun <= 0) { StepFlip = true; PlayerRun = 1; }
						}
						
						activeTicks = 0;
					}
				}
			}
			
			else if(keysDown[keys.left]) {
				if(Player.PositionX > 7) {
					activeTicks++;
					clearTicks = 0;
					Player.Flip = "left";
					
					if(activeTicks >= toActive) {
						if(map.x > 0 && Player.PlayerDefaultPosX + 24 > Player.PositionX && Player.PlayerDefaultPosX - 24 < Player.PositionX) {
							map.x -= Player.isRunning ? 1 : 0.5;
						} else {
							Player.PositionX -= Player.isRunning ? Player.RunSpeed : Player.Speed;
						}
						
						if(!Player.isRunning) {
							PlayerStep = StepFlip == true ? PlayerStep + 1 : PlayerStep - 1;
							if(PlayerStep >= 4) { StepFlip = false; PlayerStep = 4; }
							if(PlayerStep <= 0) { StepFlip = true; PlayerStep = 1; }
						} else {
							PlayerRun = StepFlip == true ? PlayerRun + 1 : PlayerRun - 1;
							if(PlayerRun >= 6) { StepFlip = false; PlayerRun = 6; }
							if(PlayerRun <= 0) { StepFlip = true; PlayerRun = 1; }
						}
						
						activeTicks = 0;
					}
				}
			}
			
			if(keysDown[keys.sprint] && isMoving(keysDown) && keysDown[keys.up] == false && keysDown[keys.down] == false) {
				Player.isRunning = true;
			} else {
				Player.isRunning = false;
			}
			
			if(!isMoving(keysDown)) {
				clearTicks++;
				activeTicks = 0;
				
				if(clearTicks >= toActive) {
					PlayerStep = 0;
					StepFlip = true;
					Player.isRunning = false;
				}
			}
	
		document.onkeyup = function(e) {
			keysDown[e.keyCode || e.which] = false; // One Command to FALSE.
		}
		
	}, ms);
	
	// Functions
	function getKey(e) {
		keysDown[e.keyCode || e.which] = true; // One Command to TRUE.
	}
	
	function isMoving(keysDown) {
		if(keysDown[keys.up] == false && keysDown[keys.right] == false && keysDown[keys.down] == false && keysDown[keys.left] == false) {
			return false;
		} else { return true; }
	}

	// Classes
	function Map(x, y, width, height) {// This Construcor of the class creates a map (2D Array) with size of 'height' and 'width'.
		this.width = width;
		this.height = height;
		this.map = [];
		this.x = x;
		this.y = y;
		
		// Generating a map :
		// Starting with filling the whole map with grass + Creating the 2D map Array
		for(var i = 0; i < height; i++) {
			this.map.push([]);
			for(var j = 0; j < width; j++) {
				this.map[i][j] = "grass";
			}
		}
		// Then adding some water
		for(var i = 0; i < Math.round((height + width) / 6); i++) {
			var WaterSizeRND = Math.floor((Math.random()*4)+1);
			var xWaterRND = Math.floor((Math.random()*width) + 1);
			var yWaterRND = Math.floor((Math.random()*height) + 1);
			
			if(xWaterRND > width - 5) { xWaterRND -= 5 }
			if(xWaterRND < 5) { xWaterRND += 5 }
			if(yWaterRND > height - 5) { yWaterRND -= 5 }
			if(yWaterRND < 5) { yWaterRND += 5 }
			
			switch(WaterSizeRND) {
				case 4:
					this.map[yWaterRND][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND + 2][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND + 2][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 2][xWaterRND + 2] = "water";
				break;
				case 3:
					this.map[yWaterRND][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND + 2][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND + 2][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 2][xWaterRND + 2] = "water";
				break;
				case 2:
					this.map[yWaterRND][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND + 2][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND + 2][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 2][xWaterRND + 2] = "water";
				break;
				case 1:
					this.map[yWaterRND][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 1][xWaterRND] = "water";
					this.map[yWaterRND + 2][xWaterRND] = "water";
					this.map[yWaterRND + 1][xWaterRND + 1] = "water";
					this.map[yWaterRND + 2][xWaterRND + 1] = "water";
					this.map[yWaterRND + 1][xWaterRND + 2] = "water";
					this.map[yWaterRND + 2][xWaterRND + 2] = "water";
					
				break;
			}
		}
		
		this.Screen = function(width, height) { // Make partition of the map, seen on screen, work with coordinates (x, y), actually it returnes a 2D array that is rendered later.
			var mapMask = [];
			var y = Math.floor(this.y);
			var x = Math.floor(this.x);
			if(y < this.map.length && x < this.map[0].length) {
				for(var i = 0; i < height; i++) {
					mapMask.push([]);
					for(var j = 0; j < width; j++) {
						mapMask[i][j] = this.map[i + y][j + x];
					}
				}
			}
			return mapMask;
		}
	}
	
	function Block(path, BlockSize) { // Block Class
		this.path = path; // Set source path
		this.img = new Image(); // Create new img element
		this.img.src = this.path; // Set image source path
		this.BlockSize = BlockSize;
		
		this.DrawBlock = function(ctx, x, y) { // Draw Block Function
			ctx.drawImage(this.img, x, y, BlockSize, BlockSize);
		}
	}
	function Player(defx, defy, x, y, PlayerSizeW, PlayerSizeH, Flip, Speed, RunSpeed) { // Player Class
		this.right_path = "res/sprites/davis_right.png"; // Set source path
		this.right_img = new Image(); // Create new img element
		this.right_img.src = this.right_path; // Set image source path
		
		this.left_path = "res/sprites/davis_left.png"; // Set source path
		this.left_img = new Image(); // Create new img element
		this.left_img.src = this.left_path; // Set image source path
		this.PositionX = x;
		this.PositionY = y;
		this.PlayerSizeW = PlayerSizeW;
		this.PlayerSizeH = PlayerSizeH;
		this.Flip = Flip;
		this.PlayerDefaultPosX = defx;
		this.PlayerDefaultPosY = defy;
		this.Speed = Speed;
		this.RunSpeed = RunSpeed;
		this.isRunning = false;
		
		this.Draw_PlayerStand = function(ctx) {
			switch(this.Flip) {
				case "right":
					ctx.drawImage(this.right_img, 16, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
				
				case "left":
					ctx.drawImage(this.left_img, 736, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
			}
		}
		this.Draw_PlayerStep = function(ctx, step) {
			switch(step) {
				case 1:
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 340, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 425, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				break;
				case 2:
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 420, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 347, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				break;
				case 3:
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 500, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 267, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				break;
				case 4:
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 580, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 185, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				break;
			}
		}
		this.Draw_PlayerRun = function(ctx, step) {
				if(step == 1 || step == 2) {
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 11, 171, 55, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 730, 171, 55, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				}
				if(step == 3 || step == 4) {
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 104, 171, 55, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 650, 171, 55, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				}
				if(step == 5 || step == 6) {
					if(this.Flip == "right") {
						ctx.drawImage(this.right_img, 171, 171, 55, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					} else {
						ctx.drawImage(this.left_img, 575, 171, 60, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
					}
				}
		}
	}
}