    //colors
		var RED = [1,0,0];
		var BLUE = [0,0.4,1];
		var GREEN = [0,1,0];
		var YELLOW = [1,1,0];

		const RED_NEXT = "GREEN";
		const GREEN_NEXT = "YELLOW";
		const YELLOW_NEXT = "BLUE";
		const BLUE_NEXT = "RED";
		
		const MODE = {
			SELECT: "SELECT",
			MOVE: "MOVE",
			THROWDIE: "THROWDIE"
		};
		
		var scene = 0;
		var mode = MODE.THROWDIE;
		var turn = "RED";
		var clicked = false;		

		//SELECT mode variables
		var selectMode = true;
		var pixelValues = new Uint8Array(4*4);
		
		var oldTime = now();
		var mouseX = 0;
		var mouseY = 0;

		var viewA = Math.PI/4, realA = Math.PI/4;
		var viewB = Math.PI/6, realB = Math.PI/6;
		var viewD = 40, realD = 40;

		//Die rotation		
		var speed = [random(100,300), random(100,300), random(100,300)];
		var passedTime = 0;

		//Object movement
		var phase = 0.0;

		//Pawn paths
		const BLUE_PATH = [
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,
			14,15,16,17,18,19,20,21,22,23,24,25,26,27,
			28,29,30,31,32,33,34,35,36,37,38,39,40,41,
			42,43,44,45,46,47,48,49,50,51,52,53,54,55,
			71,72,73,74,75
		];
		const RED_PATH = [
			14,15,16,17,18,19,20,21,22,23,24,25,26,27,
			28,29,30,31,32,33,34,35,36,37,38,39,40,41,
			42,43,44,45,46,47,48,49,50,51,52,53,54,55,
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,
			66,67,68,69,70
		];
		const GREEN_PATH = [
			28,29,30,31,32,33,34,35,36,37,38,39,40,41,
			42,43,44,45,46,47,48,49,50,51,52,53,54,55,
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,
			14,15,16,17,18,19,20,21,22,23,24,25,26,27,
			61,62,63,64,65
		];
		const YELLOW_PATH = [
			42,43,44,45,46,47,48,49,50,51,52,53,54,55,
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,
			14,15,16,17,18,19,20,21,22,23,24,25,26,27,
			28,29,30,31,32,33,34,35,36,37,38,39,40,41,
			56,57,58,59,60
		];

		//Scene constants
		//grass - 0,
		//sand - 1
		//mountains - 2
		const sceneLightings = [
			[[0,0.2,0],[0.8,1,0.4]],
			[[0.4,0.4,0],[1,1,0.8]],
			[[0,0,0.2],[0.9,0.9,1]]
		];

		//Scene colors constants
		//grass - 0,
		//sand - 1
		const sceneColors = [
			[[1,0,0],[0,0.4,1],[0,1,0],[1,1,0]],
			[[1,0.2,0],[0,0,1],[0,0.8,0.8],[1,0.8,0]],
			[[0.5,0.1,0],[0,0.2,1],[0,0.4,0.1],[1,1,1]]
		];

		const pawnColorNames = [
			["ЧЕРВЕНИ", "ЗЕЛЕНИ", "ЖЪЛТИ", "СИНИ"],
			["ОРАНЖЕВИ", "КАРИБСКИ", "ПЯСЪЧНИ", "КОБАЛТОВОСИНИ"],
			["ТЪМНОЧЕРВЕНИ", "ТЪМНОЗЕЛЕНИ", "СНЕЖНОБЕЛИ", "СИНИ"]
		];