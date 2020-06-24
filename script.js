const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d")
let gridSize = 10;
let cells = (canvas.width / gridSize) * (canvas.height / gridSize)

let board = new Board(canvas.width, canvas.height, gridSize, cells/4)
board.init()
let controls = new Controls(board);

window.addEventListener("resize", () => {
   board.mouseOffset = board.computeOffset();
})