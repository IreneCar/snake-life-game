//Creating canvas
const canvas = document.querySelector("#gameCanvas");
//2 dimentional drawing context
const ctx = canvas.getContext("2d");

//Creating the snake
let snake = [ {x:300, y:300}, {x:280, y:300}, {x:260, y:300}, {x:240, y:300}, {x:220, y:300} ];

//Un círculo:
/*
ctx.beginPath();
ctx.fillStyle = "#ffabf6";
ctx.arc(300, 300, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();
*/

// Un cuadrado:
/*
ctx.fillStyle = 'lightblue';  
ctx.strokestyle = 'darkblue';
ctx.fillRect(300, 300, 10, 10);  
ctx.strokeRect(300, 300, 10, 10);
*/

//Cadena de círculos para snakeBody   <----- no funciona!!!!!!!
function drawSnakeBody(snakePart) {
	ctx.beginPath();
	ctx.fillStyle = "#ffabf6";
	ctx.arc(snakePart.x, snakePart.y, 10, 0, 2*Math.PI);
	ctx.fill();
}

function drawSnake() {
	console.log("entra");
	snake.forEach((snakePart)=> drawSnakeBody(snakePart));
	/*for (snakePart of snake){
		drawSnakeBody();
	}*/
}
drawSnake();

/*
//Cadena con cuadrados
function drawSnakeBody(snakePart) 
{  
  ctx.fillStyle = 'lightblue';  
  ctx.strokestyle = 'darkblue';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
*/
