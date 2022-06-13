// ------------------------ 1. creamos canvas ------------------------
//Creating canvas
const canvas = document.querySelector("#gameCanvas");
//2 dimentional drawing context
const ctx = canvas.getContext("2d");


// Update the screen
let speed = 7;

function canvasUpdate(){
	clearScreen();
	setTimeout(canvasUpdate, 1000/ speed);
}
canvasUpdate();

function clearScreen(){
	ctx.fillStyle = '#464555';
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}