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
let gridNumber = 20;
// tamaño de la cuadrícula
let gridSize = canvas.width / gridNumber - 20;
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



// ------------------------ 2. Update Screen ------------------------

// Esta función refrescará el canvas
function canvasUpdate(){
	clearScreen();
	changeSnakePosition();
	checkCandyCollision();
	drawHappyCandy();
	drawSnake();
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
if(snakeParts.length > tailLength){
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
		happyCandyX = Math.floor(Math.random() * gridNumber);
		happyCandyY = Math.floor(Math.random() * gridNumber);
		//incrementamos el tamaño de la serpiente
		tailLength ++;
	}
	
}


canvasUpdate();