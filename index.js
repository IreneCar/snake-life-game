// ------------------------ 1. creamos canvas ------------------------

//Creating canvas
const canvas = document.querySelector("#gameCanvas");
//2 dimentional drawing context
const ctx = canvas.getContext("2d");



// ------------------------ Variables que usaremos ------------------------

//clase que contiene las posiciones X y Y del cuerpo de la serpiente
class SnakePart{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

let speed = 7;

// cuadrícula creada que crea una rejilla que consta de 20 cuadros en vertical x 20 en horizontal imaginarios 
let gridNumber = 30;
// tamaño de la cuadrícula
let gridSize = canvas.width / gridNumber - 3;
// posición de la cabeza de la serpiente en horizontal
let headX = 15;
// posición de la cabeza de la serpiente en vertical
let headY = 15;
// Array con las partes del cuerpo de la serpiente
const snakeParts = [];
let tailLength = 2;

//caramelos de la felicidad
let happyCandyX = 5;
let happyCandyY= 5;

//Velocidad Horizontal
let xVelocity = 0;
//Velocidad Vertical
let yVelocity = 0;

//Score
let score = 1;
console.log("Score: ", score);

//Audio de cuando come el caramelo
const sound = new Audio("bite.mp3")


// ------------------------ 2. Update Screen ------------------------

// Esta función refrescará el canvas
function canvasUpdate(){
	changeSnakePosition();

	//si la serpiente colisiona con la pared o con ella misma y hace game over
	//no dibujará nada más del juego, se pausará y saldrá el game over con el return.
	let result = isGameOver();
	if(result){
		return;
	};

	clearScreen();

	checkCandyCollision();
	drawHappyCandy();
	drawSnake();

	//increase speed cada vez que coma caramelo de la felicidad
	if(score > 5){
		speed = 10;
	}
	if(score > 10){
		speed = 12;
	}
	if(score > 15){
		speed = 15;
	}
	if(score > 20){
		speed = 19;
	}

	setTimeout(canvasUpdate, 1000/ speed);
}

//Esta función dibuja el fondo del canvas
function clearScreen(){
	ctx.fillStyle = '#464555';
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}


// ------------------------ 3. Create the snake ------------------------

//Esta función dibuja la cabeza de la serpiente
function drawSnake(){

//Cuerpo de la serpiente
ctx.fillStyle = "#00ADAD";
for (let i = 0; i < snakeParts.length; i++){
	let part = snakeParts[i];
	ctx.beginPath();
	ctx.arc(part.x * gridNumber, part.y * gridNumber, gridSize, 0, 2*Math.PI);
	ctx.fill();
}

snakeParts.push(new SnakePart(headX, headY)); // añade una bola al final de la array
while(snakeParts.length > tailLength){
	snakeParts.shift(); //Cuando el contenido del array sea mayor a tailLength elimina el primer elemento del array
}

//Cabeza de la serpiente
ctx.beginPath();
	ctx.fillStyle = "#ffabf6";
	ctx.arc(headX * gridNumber, headY * gridNumber, gridSize, 0, 2*Math.PI);
	ctx.fill();
}

//Función que attach la cabeza de la serpiente con la velocidad, para que esta se mueva
function changeSnakePosition(){
	headX = headX + xVelocity;
	headY = headY + yVelocity;
}


// ------------------------ 4. Make the snake move ------------------------

//usamos un EventListener para llamar la función que permite el uso del teclado
document.body.addEventListener('keydown', keyDown)
//Esta función permite el uso del teclado para mover la serpiente
function keyDown(event){
	//up
	if(event.key === 'ArrowUp'){
		if(yVelocity == 1){
			return;
		}
		yVelocity = -1;
		xVelocity = 0;
	}

	//down
	if(event.key === 'ArrowDown'){
		if(yVelocity == -1){
			return;
		}
		yVelocity = 1;
		xVelocity = 0;
	}

	//right
	if(event.key === 'ArrowRight'){
		if(xVelocity == -1){
			return;
		}
		yVelocity = 0;
		xVelocity = 1;
	}

	//left
	if(event.key === 'ArrowLeft'){
		if(xVelocity == 1){
			return;
		}
		yVelocity = 0;
		xVelocity = -1;
	}

}


// ------------------------ 5. El Caramelo de la Felicidad ------------------------

//función para crear el caramelo de la felicidad
function drawHappyCandy() {
	ctx.beginPath();
	ctx.fillStyle = "#FFB379";
	ctx.arc(happyCandyX * gridNumber, happyCandyY * gridNumber, gridSize, 0, 2*Math.PI);
	ctx.fill();
}


// ------------------------ 6. Colisiones ------------------------

//Esta función hace que cuando la posición X y Y de la cabeza de la serpiente y del caramelo se encuentren
//el caramelo cambie su posición de manera random y el uso de Math.floor es para redondear el número de la posición.
function checkCandyCollision(){
	if(headX === happyCandyX && headY === happyCandyY){
		happyCandyX = Math.floor(Math.random() * canvas.height / gridNumber);
		happyCandyY = Math.floor(Math.random() * canvas.height / gridNumber);
		//incrementamos el tamaño de la serpiente
		tailLength ++;

		//score, cada vez que la serpiente colisiona con el caramelo suma un punto
		let scoreElem = document.querySelector("#score");
	  scoreElem.innerHTML = score;
		score ++;
		console.log("score2: ",score);

		//Add sound
		sound.play();
	}

}


// ------------------------ 7. El Game Over ------------------------

function isGameOver(){
	let gameOver = false;

	//Hacer que detecte si la serpiente está en movimiento para que no dé game over al inicio
	// ya que al inicio el cuerpo de la serpiente colisiona con la cabeza, pero aún no ha empezado el juego
	if(yVelocity === 0 && xVelocity === 0){
		return false;
	}


	//colision con las paredes:
	//izquierda
	if(headX  < 0){
		gameOver = true;
	}
	//arriba
	if(headY < 0){
		gameOver = true;
	}
	//derecha
	if(headX > canvas.width / gridNumber){
		gameOver = true;
	}
	//abajo
	if(headY > canvas.height / gridNumber){
		gameOver = true;
	}

	//game over al colisionar la serpiente consigo misma
	for(let i = 0; i < snakeParts.length; i++){
		let part = snakeParts[i];
		if(part.x === headX && part.y === headY){
			gameOver = true;
			break;
		}
	}
	

	//Texto de "Demasiada negatividad!"
	if(gameOver){
		ctx.fillStyle = "#FF7D88"
		ctx.font = "70px Fredoka One, cursive";
		ctx.fillText("Demasiada", canvas.width / 5.6, canvas.height / 2.1);

		ctx.fillStyle = "#F0616F"
		ctx.font = "70px Fredoka One, cursive";
		ctx.fillText("negatividad!", canvas.width / 7.2, canvas.height / 1.6);
	}


	return gameOver
}


canvasUpdate();