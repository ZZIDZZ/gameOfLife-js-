const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

//global vars
let cellSize = 10;
cols = canvas.width / cellSize;
rows = canvas.height / cellSize;
let origins = make2dArray(cols, rows);
let next = make2dArray(cols, rows);
let game = true;
let density = 0.5;


function make2dArray(coll, row) {
    let arr = new Array(row);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(coll);
    }
    return arr;
}
function initialize() {
    let randomizer
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            randomizer = Math.floor(Math.random() * 15);
            origins[i][j]=(randomizer<density)?1:0;
            if (j == cols - 1 || j == 0 || i == 0 || i == rows - 1) {
                origins[i][j] = 0
            }
            ctx.strokeStyle = 'black';
            ctx.strokeRect(cellSize * i, cellSize * i, cellSize, cellSize);
        }
    }
    next = origins;

    for(let i=1;i<rows-1; i++){
        for(let j=1;j<cols-1;j++){
            sum = countNeighbors(i,j);
            if (origins[i][j] == 0 && sum == 3) {
                next[i][j] = 1;
            } else if (origins[i][j] == 1 && (sum < 2 || sum > 3)) {
                next[i][j] = 0;
            } 
        }
    }
    handleGrids();
}
initialize();

function draw(row, coll, val) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(cellSize * coll, cellSize * row, cellSize, cellSize);
    if (val == 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(cellSize * coll, cellSize * row, cellSize, cellSize);
    }
    else if (val == 0) {
        ctx.fillStyle = 'white';
        ctx.fillRect(cellSize * coll, cellSize * row, cellSize, cellSize);
    }
    
}
function countNeighbors(row, coll){
    let i,j,sum=0;
    for(i=-1;i<=1;i++){
        for(j=-1;j<=1;j++){
            if(!(i==0&&j==0)){
                sum+=origins[row+i][coll+j];
            }
        }
    }
    return sum;
}
function handleGrids() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            draw(i,j,origins[i][j]);
        }
    }
}
handleGrids();

document.onkeydown = function (e) {
    switch (e.key) {
        case 's':
            ruleOfLife();
            break;
        case'r':
            if(!game){
                restartGame();
            }
            break;
        case'p':
            game = false;
            break;
        
    }
};

function ruleOfLife(){
    console.log('duar');
    for(let i=1;i<rows-1; i++){
        for(let j=1;j<cols-1;j++){
            sum = countNeighbors(i,j);
            if (origins[i][j] == 0 && sum == 3) {
                next[i][j] = 1;
            } else if (origins[i][j] == 1) {
                if(sum < 2 || sum > 3){
                    next[i][j] = 0;
                }
                else next[i][j]=1;
            } 
            else next[i][j]=0;
        }
    }
    origins = next;
    handleGrids();
    if(game){
        requestAnimationFrame(ruleOfLife);
    }
}

function restartGame(){
    initialize(origins, next);
    game = true;
    handleGrids();
}




