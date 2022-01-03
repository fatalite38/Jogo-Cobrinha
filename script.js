let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

/* variavel em que a cobrinha vai */
let direction = "right";

/* criando a comida da cobrinha em lugares aleatorios do box */
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

/* criando a caixa box onde ocorre o jogo */
function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
/* criando a cobrinha em formato de cubo */

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "purple";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
/* dando formato a comida da cobra */
function drawFood(){
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', uptdate);

/* definindo as direções*/
function uptdate (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){ /* funções para fazer a cobrinha aparecer do lado oposto quando passar do Box */
 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;  /* Se a snake[0](cabeça da cobra) da posição x for maior que 15 vezes o tamanho do box e a direção for pra direita ela vai receber o valor de zero e voltar da esquerda pra direita denovo */
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* coordenadas de aumentar ou diminuir */
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;


    if(snakeX != food.x || snakeY != food.y){
        snake.pop();     /* função pop retira o ultimo elemento do array */
    } 
    else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }



    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);  /* criando uma nova cabeça com metodo UNSHIFT que acrescenta no primeiro elemento a frente */

}
/* função que determina a parada do jogo quando completo */
let jogo = setInterval(iniciarJogo, 100);