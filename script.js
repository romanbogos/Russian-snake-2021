let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

let x = 1,
    y = 10;
for (let i = 0; i < 100; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
    excel.setAttribute('posX', x);
    excel.setAttribute('posY', y);
    x++;
    if (x > 10) {
        x = 1;
        y--;
    }
}

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}
let positionSnake = generateSnake();
let snakeBody = [
    document.querySelector(`[posX = "${positionSnake[0]}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-1}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-2}"][posY = "${positionSnake[1]}"]`)
]
for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

let food;

function createFood() {
    function generateFood() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    do {
        let positionFood = generateFood();
        food = document.querySelector(`[posX = "${positionFood[0]}"][posY = "${positionFood[1]}"]`)
    } while (food.classList.contains('snakeBody'))
    food.classList.add('food');
}
createFood();

let direction = 'right';

function move() {
    let snakeCoordinates = [
        snakeBody[0].getAttribute('posX'),
        snakeBody[0].getAttribute('posY')
    ];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();
    if (direction == 'right') {
        if (snakeCoordinates[0] == 10) {
            snakeCoordinates[0] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0]+1}"][posY = "${+snakeCoordinates[1]}"]`));
    }
    
    if (direction == 'left') {
        if (snakeCoordinates[0] == 1) {
            snakeCoordinates[0] = 11;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0]-1}"][posY = "${+snakeCoordinates[1]}"]`));
    }
    if (direction == 'up') {
        if (snakeCoordinates[1] == 10) {
            snakeCoordinates[1] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0]}"][posY = "${+snakeCoordinates[1]+1}"]`));
    } else if (direction == 'down') {
        if (snakeCoordinates[1] == 1) {
            snakeCoordinates[1] = 11;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0]}"][posY = "${+snakeCoordinates[1]-1}"]`));
    }
    if(snakeBody[0].getAttribute('posX')==food.getAttribute('posX') && snakeBody[0].getAttribute('posY')==food.getAttribute('posY'))
    {
        food.classList.remove('food');
        createFood();
        let x = snakeBody[snakeBody.length-1].getAttribute('posX');
        let y = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector(`[posX="${+x}"][posY="${+y}"]`));
    }
    if(snakeBody[0].classList.contains('snakeBody')){
            setTimeout(()=>{
                alert("КОНЕЦ ИГРЫ");
            },400);
            clearInterval(timerMoveSnake);
            snakeBody[0].style.background = 'url(./pic/sad-cat.png) center no-repeat';
            snakeBody[0].style.backgroundSize = 'cover';
        }    
    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    }

}

let timerMoveSnake = setInterval(move, 300);

window.addEventListener('keydown', (event) => {
            let keyPressed = event.code;

            if (keyPressed == 'ArrowRight' && direction != 'left') {
                direction = 'right';
            } else if (keyPressed == 'ArrowLeft' && direction !="right") {
                direction = 'left';}
                else if (keyPressed == 'ArrowDown' && direction != 'up') {
                    direction = 'down';}
                    else if (keyPressed == 'ArrowUp' && direction != 'down') {
                        direction = 'up';}

                    });
                    
                    