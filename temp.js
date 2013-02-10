
// Main JS File of the HTML5 Canvas Game

window.onload = function() {

"use strict";
	
	// Block Size
	var BlockSize = 25;
	
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
	var Player = new Player(canvas_width/2 - PlayerSizeW, canvas_height/2 - PlayerSizeH / 2, PlayerSizeW, PlayerSizeH);
	var PlayerStep = 0;
	
	var clearTicks = 0;
	var activeTicks = 0;
	var toActive = 1;
	
	var keyDown;
	
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
		if(PlayerStep > 0) {
			Player.Draw_PlayerStep(ctx, PlayerStep);
		} else {
			Player.Draw_PlayerStand(ctx);
		}
		
		// Check if the user pressed a key, and if he did, it returns which key is pressed
		clearTicks++;
		document.onkeydown = getKey;
		if(clearTicks > 5) { PlayerStep = 0; activeTicks = 0; }
		
	}, ms);
	
	// Functions
	function getKey(e) {
		switch(e.keyCode) {
			case 38:
				if( map.y > 0) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.y--;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 87:
				if( map.y > 0) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.y--;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 39:
				if(map.map[0].length > map.x && map.x + 1 + canvas_width/BlockSize <= map.map[0].length) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.x++;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 68:
				if(map.map[0].length > map.x) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.x++;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 40:
				if(map.map.length > map.y && map.y + mapMask_Height < map.map.length) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.y++;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 83:
				if(map.map.length > map.y && map.y + mapMask_Height < map.map.length) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.y++;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 37:
				if( map.x > 0) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.x--;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
			case 65:
				if( map.x > 0) {
					activeTicks += 0.5;
					if(activeTicks >= toActive) {
						map.x--;
						PlayerStep = PlayerStep == 4 ? 1 : PlayerStep + 1; activeTicks = 0;
					}
					clearTicks=0;
				}
			break;
		}
		console.log("x : " + map.x);
		console.log("y : " + map.y);
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
			if(this.y < this.map.length && this.x < this.map[0].length) {
				for(var i = 0; i < height; i++) {
					mapMask.push([]);
					for(var j = 0; j < width; j++) {
						mapMask[i][j] = this.map[i + this.y][j + this.x];
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
	function Player(x, y, PlayerSizeW, PlayerSizeH) { // Player Class
		this.path = "res/sprites/davis_right.png"; // Set source path
		this.img = new Image(); // Create new img element
		this.img.src = this.path; // Set image source path
		this.PositionX = x;
		this.PositionY = y;
		this.PlayerSizeW = PlayerSizeW;
		this.PlayerSizeH = PlayerSizeH;
		
		this.Draw_PlayerStand = function(ctx) {
			ctx.drawImage(this.img, 16, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
		}
		this.Draw_PlayerStep = function(ctx, step) {
			switch(step) {
				case 1:
					ctx.drawImage(this.img, 340, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
				case 2:
					ctx.drawImage(this.img, 420, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
				case 3:
					ctx.drawImage(this.img, 500, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
				case 4:
					ctx.drawImage(this.img, 580, 8, 48, 75, this.PositionX, this.PositionY, this.PlayerSizeW, this.PlayerSizeH);
				break;
			}
		}
	}
}