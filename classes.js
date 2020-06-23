class Board {
  constructor(width, height, cellSize, startingNodes = 60) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.nodes = Array.from({ length: this.width / this.cellSize }, (v, x) => {
      return Array.from(
        { length: this.height / this.cellSize },
        (v, y) => new Node(x, y, this.cellSize, this.cellSize)
      );
    });
    this.createRandomNodes(startingNodes);
    this.drawBoard();
    this.drawNodes();
  }

  drawBoard() {
    //Vertical lines
    ctx.beginPath();
    for (let x = 0; x <= this.width; x += this.cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    ctx.stroke();

    //Horizontal Lines
    ctx.beginPath();
    for (let y = 0; y <= this.height; y += this.cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();
  }

  createNode(x, y) {
    this.nodes[x][y].giveLife();
  }

  drawNodes() {
    this.nodes.forEach((row) => {
      let alives = row.filter((node) => node.alive);
      alives.forEach((node) => {
        node.draw();
      });
    });
  }

  checkSurroundings(node) {
    let x = node.x;
    let y = node.y;
    let countAlive = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      if (i < 0 || i > this.width / this.cellSize - 1) continue;
      for (let k = y - 1; k <= y + 1; k++) {
        if (k < 0 || k > this.height / this.cellSize - 1) continue;
        if (this.nodes[i][k].alive && this.nodes[i][k] != node) countAlive++;
      }
    }
    return countAlive;
  }

  generateNewNodes() {
    let newNodes = Array.from({ length: this.height / this.cellSize }, () => {
      return Array.from({ length: this.width / this.cellSize });
    });
    this.nodes.forEach((row) => {
      row.forEach((node) => {
        let surroundingNodes = this.checkSurroundings(node);
        let newNode = new Node(node.x, node.y, this.cellSize, this.cellSize);

        if (!node.alive && surroundingNodes === 3) newNode.giveLife();
        if (node.alive && surroundingNodes > 1 && surroundingNodes < 4)
          newNode.giveLife();
        newNodes[node.x][node.y] = newNode;
      });
    });
    return newNodes;
  }
  updateBoard() {
    this.nodes = this.generateNewNodes();
    this.clear();
    this.drawBoard();
    this.drawNodes();
  }
  createRandomNodes(num) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let maxYCoordinate = this.height / this.cellSize;
    let maxXCoordinate = this.width / this.cellSize;
    // console.log(MaxXCoordinate);

    for (let i = 0; i < num; i++) {
      this.nodes[getRandomInt(maxXCoordinate)][
        getRandomInt(maxYCoordinate)
      ].giveLife();
    }
  }
  clear() {
    ctx.clearRect(0, 0, this.width, this.height);
  }
}

class Node {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = false;
  }
  giveLife() {
    this.alive = true;
  }
  takeLife() {
    this.alive = false;
  }
  get drawX() {
    return this.x * this.width;
  }
  get drawY() {
    return this.y * this.height;
  }
  draw() {
    ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
  }
}

class Timer {
  constructor() {
    this.button = document.querySelector("#pause");
    this.running = false;
    this.timer;
    this.initButton();
  }
  initButton() {
    this.button.addEventListener("click", () => {
      if (this.running) {
        clearInterval(this.timer);
        this.running = false;
      } else {
        this.startTimer();
        this.running = true;
      }
      this.updateButtonText()
    });
  }
  startTimer() {
    this.timer = setInterval(() => {
      board.updateBoard();
    }, 90);
  }
  updateButtonText() {
    if(this.running) {
      this.button.textContent = "Stop"
    } else {
      this.button.textContent = "Start"
    }
  }
}
