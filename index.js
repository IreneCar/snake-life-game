// ------------------------ 1. creamos canvas ------------------------
//Creating canvas
const canvas = document.querySelector("#gameCanvas");
//2 dimentional drawing context
const ctx = canvas.getContext("2d");


// ------------------------ 2. Update Screen ------------------------

let speed = 7;

// cuadrícula creada que crea una rejilla que consta de 20 cuadros en vertical x 20 en horizontal imaginarios 
let gridNumber = 20;
// tamaño de la cuadrícula
let gridSize = canvas.width / gridNumber - 20;
// posición de la cabeza de la serpiente en horizontal
let headX = 15;
// posición de la cabeza de la serpiente en vertical
let headY = 15;

//Velocidad Horizontal
let xVelocity = 0;
//Velocidad Vertical
let yVelocity = 0;


// Esta función refrescará el canvas
function canvasUpdate(){
	clearScreen();
	drawSnakeHead();
	setTimeout(canvasUpdate, 1000/ speed);
}

//Esta función dibuja el fondo del canvas
function clearScreen(){
	ctx.fillStyle = '#464555';
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

//Esta función dibuja la cabeza de la serpiente
function drawSnakeHead(){
	ctx.beginPath();
	ctx.fillStyle = "#ffabf6";
	ctx.arc(headX * gridNumber, headY * gridNumber, gridSize, 0, 2*Math.PI);
	ctx.fill();
}

canvasUpdate();