var gridHeight = 400; //be careful with these numbers
var gridWidth = 400;
var theGrid = createArray(gridWidth);
var mirrorGrid = createArray(gridWidth);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
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
    for (var j = 0; j < gridHeight; j++) { //iterate through rows
        for (var k = 0; k < gridWidth; k++) { //iterate through columns
            theGrid[j][k] = Math.floor(Math.random()*6);
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
	for (var j = 1; j < gridHeight; j++) { //iterate through rows
		for (var k = 1; k < gridWidth; k++) { //iterate through columns
			if (theGrid[j][k] === 1) {
				ctx.fillRect(j, k, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#f7a576";
				ctx.fillStyle = "#849324";				
			}
			if(theGrid[j][k] === 2){
				ctx.fillRect(j, k, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#25b28a";
				ctx.fillStyle = "#FFB30F";
			}
			if(theGrid[j][k] === 3){
				ctx.fillRect(j, k, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#01295F";
			}
			if(theGrid[j][k] === 4){
				ctx.fillRect(j, k, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#FD151B";
			}
			if(theGrid[j][k] === 5){
				ctx.fillRect(j, k, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#BEE9E8";
			}
		}
	}
	//if(count % 50 === 0){
	//	ctx.fillStyle = "rgba("+ red + ", " + green + ", " + blue + ", 1)";
	//}
	console.log(liveCount/100);
}

function updateGrid() { //perform one iteration of grid update
       
    for (var j = 1; j < gridHeight - 1; j++) { //iterate through rows
        for (var k = 1; k < gridWidth - 1; k++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += theGrid[j - 1][k - 1]; //top left
            totalCells += theGrid[j - 1][k]; //top center
            totalCells += theGrid[j - 1][k + 1]; //top right
			
            totalCells += theGrid[j][k - 1]; //middle left
            totalCells += theGrid[j][k + 1]; //middle right

            totalCells += theGrid[j + 1][k - 1]; //bottom left
            totalCells += theGrid[j + 1][k]; //bottom center
            totalCells += theGrid[j + 1][k + 1]; //bottom right
            //apply the rules to each cell
            switch (totalCells) {
                case 2:
                    mirrorGrid[j][k] = theGrid[j][k];
                      
                    break;
                
				case 3:
                    mirrorGrid[j][k] = 1; //live
                        
                    break;
                      
				case 6:
                    mirrorGrid[j][k] = 2; //live
					
					break;
				
				case 9:
                    mirrorGrid[j][k] = 3; //live
                        
                    break;
					
				case 12:
                    mirrorGrid[j][k] = 4; //live
                        
                    break;
					
				case 15:
                    mirrorGrid[j][k] = 5; //live
                        
                    break;
					
				default:
                    mirrorGrid[j][k] = 0; //dead
            }
        }
    }

    //mirror edges to create wraparound effect

    for (var l = 1; l < gridHeight - 1; l++) { //iterate through rows
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