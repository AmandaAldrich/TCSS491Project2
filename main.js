var gridHeight = 400; //be careful with these numbers
var gridWidth = 400;

var theGrid = createGrid(gridWidth);
var secondGrid = createGrid(gridWidth);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(4, 4);

//var count = 0;

fillRandom(); 

main(); 

//Main loop that maintains animation
function main() { 
    console.time("loop");
    drawGrid();
    updateGrid();
    console.timeEnd("loop");
    requestAnimationFrame(main);
}

//creates my grid structure
function createGrid(rows) { 
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

//chooses the starting condition
function fillRandom() { 
    for (var i = 0; i < gridHeight; i++) { 
        for (var j = 0; j < gridWidth; j++) { 
            theGrid[i][j] = Math.floor(Math.random()*6); //randomly picks from our 5 colonies
        }
    }
}

//draws the grid on the screen
function drawGrid() { 
	//count += 1;
	//var red = Math.floor(Math.random() * 256);
	//var green = Math.floor(Math.random() * 256);
	//var blue = Math.floor(Math.random() * 256);
	var liveCount = 0;
	ctx.clearRect(0, 0, gridHeight, gridWidth); //this should clear the canvas ahead of each redraw
	for (var i = 1; i < gridHeight; i++) { 
		for (var j = 1; j < gridWidth; j++) { 
			//draw colony 1
			if (theGrid[i][j] === 1) {
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#f7a576";
				ctx.fillStyle = "#849324";				
			}
			//draw colony 2
			if(theGrid[i][j] === 2){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#25b28a";
				ctx.fillStyle = "#FFB30F";
			}
			//draw colony 3
			if(theGrid[i][j] === 3){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#01295F";
			}
			//draw colony 4
			if(theGrid[i][j] === 4){
				ctx.fillRect(i, j, 1, 1);
				liveCount++;
				//ctx.fillStyle = "#b589f4";
				ctx.fillStyle = "#FD151B";
			}
			//draw colony 5
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

//teh update method
function updateGrid() { 
       
    for (var i = 1; i < gridHeight - 1; i++) { 
        for (var j = 1; j < gridWidth - 1; j++) { 
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
                    secondGrid[i][j] = theGrid[i][j]; //maybe live, maybe dead
                      
                    break;
                
				case 3:
                    secondGrid[i][j] = 1; //live
                        
                    break;
                      
				case 6:
                    secondGrid[i][j] = 2; //live
					
					break;
				
				case 9:
                    secondGrid[i][j] = 3; //live
                        
                    break;
					
				case 12:
                    secondGrid[i][j] = 4; //live
                        
                    break;
					
				case 15:
                    secondGrid[i][j] = 5; //live
                        
                    break;
					
				default:
                    secondGrid[i][j] = 0; //dead
            }
        }
    }




    //swap grids
    var temp = theGrid;
    theGrid = secondGrid;
    secondGrid = temp;
}