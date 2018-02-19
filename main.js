var gridHeight = 400; //be careful with these numbers
var gridWidth = 400;
var theGrid = createArray(gridWidth);
var mirrorGrid = createArray(gridWidth);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(4, 4);
var count = 0;

fillRandom(); //create the starting state for the grid by filling it with random cells

tick(); //call main loop

//functions
function tick() { //main loop
    console.time("loop");
    drawGrid();
    updateGrid();
    console.timeEnd("loop");
    requestAnimationFrame(tick);
}

function createArray(rows) { //creates a 2 dimensional array of required height
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function fillRandom() { //fill the grid randomly
    for (var i = 0; i < gridHeight; i++) { //iterate through rows
        for (var j = 0; j < gridWidth; j++) { //iterate through columns
            theGrid[i][j] = Math.floor(Math.random()*6);
        }
    }
}

function drawGrid() { //draw the contents of the grid onto a canvas
	count += 1;
	//var red = Math.floor(Math.random() * 256);
	//var green = Math.floor(Math.random() * 256);
	//var blue = Math.floor(Math.random() * 256);
	var liveCount = 0;
	ctx.clearRect(0, 0, gridHeight, gridWidth); //this should clear the canvas ahead of each redraw
	for (var i = 1; i < gridHeight; i++) { //iterate through rows
		for (var j = 1; j < gridWidth; j++) { //iterate through columns
			if (theGrid[i][j] === 1) {
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#f7a576";
				ctx.fillStyle = "#849324";				
			}
			if(theGrid[i][j] === 2){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#25b28a";
				ctx.fillStyle = "#FFB30F";
			}
			if(theGrid[i][j] === 3){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#01295F";
			}
			if(theGrid[i][j] === 4){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#FD151B";
			}
			if(theGrid[i][j] === 5){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#437F97";
			}
		}
	}
	//if(count % 50 === 0){
	//	ctx.fillStyle = "rgba("+ red + ", " + green + ", " + blue + ", 1)";
	//}
	console.log(liveCount/100);
}

function updateGrid() { //perform one iteration of grid update
       
    for (var i = 1; i < gridHeight - 1; i++) { //iterate through rows
        for (var j = 1; j < gridWidth - 1; j++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += theGrid[i - 1][j - 1]; //top left
            totalCells += theGrid[i - 1][j]; //top center
            totalCells += theGrid[i - 1][j + 1]; //top right
			
            totalCells += theGrid[i][j - 1]; //middle left
            totalCells += theGrid[i][j + 1]; //middle right

            totalCells += theGrid[i + 1][j - 1]; //bottom left
            totalCells += theGrid[i + 1][j]; //bottom center
            totalCells += theGrid[i + 1][j + 1]; //bottom right
            //apply the rules to each cell
            switch (totalCells) {
                case 2:
                    mirrorGrid[i][j] = theGrid[i][j];
                      
                    break;
                
				case 3:
                    mirrorGrid[i][j] = 1; //live
                        
                    break;
                      
				case 6:
                    mirrorGrid[i][j] = 2; //live
					
					break;
				
				case 9:
                    mirrorGrid[i][j] = 3; //live
                        
                    break;
					
				case 12:
                    mirrorGrid[i][j] = 4; //live
                        
                    break;
					
				case 15:
                    mirrorGrid[i][j] = 5; //live
                        
                    break;
					
				default:
                    mirrorGrid[i][j] = 0; //dead
            }
        }
    }

   
	//trying to fix my weird edges
    for (var l = 1; l < gridHeight; l++) { //iterate through rows
        //top and bottom
        mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
        mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
        //left and right
        mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
        mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];

    }


    //swap grids
    var temp = theGrid;
    theGrid = mirrorGrid;
    mirrorGrid = temp;
}