// ------------------------ 1. creamos canvas ------------------------
//Creating canvas
const canvas = document.querySelector("#gameCanvas");
//2 dimentional drawing context
const ctx = canvas.getContext("2d");


// ------------------------ 2. creamos la serpiente ------------------------
//Hacemos variable con las coordenadas que ocupará la serpiente dentro del canvas
let snake = [ {x:300, y:300}, {x:280, y:300}, {x:260, y:300}, {x:240, y:300}, {x:220, y:300} ];

//Cómo se dibuja un círculo?
/*
ctx.beginPath();
ctx.fillStyle = "#ffabf6";
ctx.arc(300, 300, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();
*/

//Cómo se dibuja un cuadrado?
/*
ctx.fillStyle = 'lightblue';  
ctx.strokestyle = 'darkblue';
ctx.fillRect(300, 300, 10, 10);  
ctx.strokeRect(300, 300, 10, 10);
*/

//Función que dibuja un círculo en cada objeto de la array snake
function drawSnakeBody(snakePart) {
	ctx.beginPath();
	ctx.fillStyle = "#ffabf6";
	ctx.arc(snakePart.x, snakePart.y, 10, 0, 2*Math.PI);
	ctx.fill();
}
//Función que vincula cada círculo de la función anterior con cada objeto del array. Esto nos dibuja el cuerpo de la serpiente
function drawSnake() {
	//console.log("entra");
	snake.forEach((snakePart)=> drawSnakeBody(snakePart));
	/*for (snakePart of snake){
		drawSnakeBody();
	}*/
}
drawSnake();


// ------------------------ 3. El movimiento la serpiente ------------------------
//horizontal & vertical movement
function moveSnake() {
	const head = {x: snake[0].x + dx, y: snake[0].y + dy};
	snake.unshift(head);
	snake.pop();
}


