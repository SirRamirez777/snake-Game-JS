const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");
const upArrow = document.querySelector("#upArrow");
const downArrow = document.querySelector("#downArrow");



// window.addEventListener("keydown", changeDirection);
leftArrow.addEventListener("click", turnLeft);
rightArrow.addEventListener("click", turnRight);
upArrow.addEventListener("click", turnUp);
downArrow.addEventListener("click", turnDown);

resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}
function nextTick(){
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    // alt gameHeight olarak tekrar test et
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    snake.unshift(head);
    // if food is eaten
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
}
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function turnDown(){
    const goingUp = (yVelocity == -unitSize);
    if (!goingUp) {
        xVelocity = 0;
        yVelocity = unitSize;
    }
}
function turnRight(){
    const goingLeft = (xVelocity == -unitSize);
    if (!goingLeft) {
        xVelocity = unitSize;
        yVelocity = 0;
    }
    
}
function turnUp(){
    const goingDown = (yVelocity == unitSize);
    if (!goingDown) {
        xVelocity = 0;
        yVelocity = -unitSize;
    }
}
function turnLeft(){
    const goingRight = (xVelocity == unitSize);
        if (!goingRight) {
            xVelocity = -unitSize;
            yVelocity = 0;
        }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
         running = false;
         break;
        case(snake[0].x >= gameWidth):
         running = false;
         break;
        case(snake[0].y < 0):
         running = false;
         break;
        case(snake[0].y >= gameHeight):
         running = false;
         break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
}