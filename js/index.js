//Variable declaration
let direction = {
    x: 0,
    y: 0
};
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArry = [{ x: 5, y: 10 }]
let food = { x: 10, y: 3 };
let score = 0;
let inputDir = { x: 0, y: 0 };
//Functions

function startGame(){

    function main(ctime) {
        window.requestAnimationFrame(main);
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    
    function gameEngine() {
        //Updating the snake array
        //Rendering the snake and food
    
        //Updating elements
    
    
        //getting high score 
        let highScore = localStorage.getItem("highscore");
        if (isCollide(snakeArry)) {
            gameOverSound.play();
            musicSound.pause();
            inputDir = { x: 0, y: 0 };
            alert("Game over, Press any key to continue");
            snakeArry = [{ x: 5, y: 10 }]
    
            score = 0;
            // musicSound.play();
        }
    
    
        //If food is eaten
        if (snakeArry[0].y == food.y && snakeArry[0].x == food.x) {
            snakeArry.unshift({ x: snakeArry[0].x + inputDir.x, y: snakeArry[0].y + inputDir.y });
            //Generating random number between a and b and assigning to food.
            let a = 1;
            b = 16;
            //math.random generates random number between 0 and 1;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
            foodSound.play();
            score += 1;
            scoreRes = document.getElementById('score')
            scoreRes.innerHTML = "Score: " + score
    
            //Update high score display
            if (score > JSON.parse(highScore)) {          
                localStorage.setItem("highscore", JSON.stringify(score));
                highScore.innerHTML = "High Score: " + highScore;
            }
        }
        //Moving snake
    
        for (let i = snakeArry.length - 2; i >= 0; i--) {
            // const element = array[i]
            snakeArry[i + 1] = { ...snakeArry[i] };
    
        }
    
        snakeArry[0].x += inputDir.x;
        snakeArry[0].y += inputDir.y;
    
    
        //Display
        //for snake
        board.innerHTML = "";
        snakeArry.forEach((e, index) => {
    
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
    
            if (index == 0) {
                snakeElement.classList.add('snakeHead');
            }
            else {
                snakeElement.classList.add('snakeBody');
            }
            board.appendChild(snakeElement);
    
        })
    
        //for food
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        //For high score
    
    
        //Start playing music
        // musicSound.play();
    
    
        if (highScore == null) {
            highscoreVal = 0;
            localStorage.setItem("highscore", JSON.stringify(highscoreVal));
            highScoreBox.innerHTML = "High Score: " + highscoreVal;
        }
        else {
            highscoreVal = JSON.parse(highScore);
            highScoreBox.innerHTML = "High Score: " + highscoreVal;
        }
    }
    
    //If game over
    function isCollide(snakeArry) {
        for (let i = 1; i < snakeArry.length; i++) {
            if (snakeArry[i].x === snakeArry[0].x && snakeArry[i].y === snakeArry[0].y) {
                return true;
            }
    
    
        }
        if (snakeArry[0].x >= 18 || snakeArry[0].x <= 0 || snakeArry[0].y >= 18 || snakeArry[0].y <= 0) {
            return true;
        }
    
    
    }
    
    
    
    
    
    //Logic
    
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
    
        inputDir = { x: 0, y: 1 };//Start game
        moveSound.play();
        switch (e.key) {
            case "ArrowUp":
                inputDir.x = 0;
                inputDir.y = -1;
                break;
    
            case "ArrowDown":
                inputDir.x = 0;
                inputDir.y = 1;
                break;
    
            case "ArrowLeft":
                inputDir.x = -1;
                inputDir.y = 0;
                break;
    
            case "ArrowRight":
                inputDir.x = 1;
                inputDir.y = 0;
                break;
    
            default:
                break;
        }
    })
}
function highScore(){
    let Highscore=localStorage.getItem("highscore");
    HS = JSON.parse(Highscore);
    startgame.innerHTML="";
    startgame.style="border:0px;"
    highscore.innerHTML = "High Score: " + HS;
    highscore.style="border:0px;width:30vmin;background-color:rgb(239, 133, 34);text-align:center;"

}