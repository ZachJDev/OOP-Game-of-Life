// Because this is all about practicing OOP, I
// Should probably split these buttons into their
// Own objects, Maybe inheriting from Control...
class Controls {
    constructor(board, genLength = 300) {
      this.pauseButton = document.querySelector("#pause");
      this.clearButton = document.querySelector("#clear");
      this.randomButton = document.querySelector("#random");
      this.gridButton = document.querySelector('#grid');

      this.running = false;
      this.timer;
      this.board = board;
      this.genLength = genLength;
  
      this.initPauseButton();
      this.initClearButton();
      this.initRandomButton();
      this.initGridButton();
    }
    initPauseButton() {
      this.pauseButton.addEventListener("click", () => {
        if (this.running) {
          clearInterval(this.timer);
          this.running = false;
        } else {
          this.startTimer();
          this.running = true;
        }
        this.updatePauseButtonText();
      });
    }
    startTimer() {
      this.timer = setInterval(() => {
        board.updateBoard();
      }, this.genLength);
    }
    updatePauseButtonText() {
      if (this.running) {
        this.pauseButton.textContent = "Stop";
      } else {
        this.pauseButton.textContent = "Start";
      }
    }
    updateGridButtonText() {
        if(this.board.grid) this.gridButton.textContent = "Grid On"
        if(!this.board.grid)  this.gridButton.textContent= "Grid Off"
    }
    initClearButton() {
      this.clearButton.addEventListener("click", () => {
        this.board.resetNodes();
        this.board.clear();
        if(this.board.grid === true) this.board.drawBoard();
        this.running = false;
        this.updatePauseButtonText();
        clearInterval(this.timer);
      });
    }
    initRandomButton() {
      this.randomButton.addEventListener("click", () => {
        this.board.resetNodes();
        this.board.clear();
        this.board.createRandomNodes(this.board.startingNodes);
        this.board.draw();
      });
    }
    initGridButton() {
        this.gridButton.addEventListener("click", () => {
            this.board.clear();
            this.board.grid = !this.board.grid;
            this.board.draw();
            this.updateGridButtonText();
        })
    }
  }
  