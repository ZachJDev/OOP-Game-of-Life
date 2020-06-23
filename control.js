class Controls {
    constructor(board, genLength = 300) {
      this.pauseButton = document.querySelector("#pause");
      this.clearButton = document.querySelector("#clear");
      this.randomButton = document.querySelector("#random");
      
      this.running = false;
      this.timer;
      this.board = board;
      this.genLength = genLength;
  
      this.initPauseButton();
      this.initClearButton();
      this.initRandomButton();
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
  }
  