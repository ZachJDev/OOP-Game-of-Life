const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d")
let gridSize = 10
let cells = (canvas.width / gridSize) * (canvas.height / gridSize)
console.log(cells)

let board = new Board(canvas.width, canvas.height, gridSize, cells/3)
board.drawBoard();
board.drawNodes();


let timer = setInterval(() => {
    board.updateBoard();
}, 50)

document.querySelector("button").addEventListener("click", () => {
    clearInterval(timer)
})
