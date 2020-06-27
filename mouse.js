class Mouse {
    constructor(board) {
        this.board = board;
        this.canvas = board.canvas;
        this.drawX = 0;
        this.drawY = 0;
        this.addListeners();
    }
    addListeners() {
        this.canvas.addEventListener("mousemove", (event) => {
            event.preventDefault(); // To (hopefully) stop highlighting things
            // Set the drawX and drawY values. they don't change if the ctrl or the shift
            // Keys are held down, respectively. This allows for easily drawn straight lines. 
            let x = Math.floor(event.offsetX/ this.board.cellSize)
            if(!event.ctrlKey) this.drawX = x;
            let y = Math.floor(event.offsetY / this.board.cellSize)
            if(!event.shiftKey) this.drawY = y;

            if(event.buttons == 0 ) return
            this.board.traceNode(this.drawX,this.drawY)
          });
          this.canvas.addEventListener("mousedown",() => {
              event.preventDefault(); // For the highlighting

              // Sets the drawX and DrawY values here too, so the value is correct if the user
              // Was holding down shift/ctrl before drawing a line.
              this.drawX = Math.floor(event.offsetX/ this.board.cellSize)
              this.drawY = Math.floor(event.offsetY / this.board.cellSize)
              this.board.traceNode(this.drawX,this.drawY)
          });
    }
}