class Board {
  constructor(width, height, cellSize, startingNodes = 60, grid = true) {
    this.canvas = document.querySelector("canvas");
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.startingNodes = startingNodes;
    this.grid = grid;

    this.mouse = new Mouse(this);
    this.lastDrawn = null;
  }
  createNode(x, y) {
    this.nodes[x][y].giveLife();
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

  drawNodes() {
    this.nodes.forEach((row) => {
      let alives = row.filter((node) => node.alive);
      alives.forEach((node) => {
        node.draw();
      });
    });
  }

  draw() {
    if (this.grid) this.drawBoard();
    this.drawNodes();
  }
  resetNodes() {
    this.nodes = Array.from({ length: this.width / this.cellSize }, (v, x) => {
      return Array.from(
        { length: this.height / this.cellSize },
        (v, y) => new Cell(x, y, this.cellSize, this.cellSize)
      );
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
        let newNode = new Cell(
          node.x,
          node.y,
          this.cellSize,
          this.cellSize,
          true
        );

        if (!node.alive && surroundingNodes === 3) newNode.giveLife();
        if (node.alive && surroundingNodes > 1 && surroundingNodes < 4)
          newNode.survives(node.generation);
        newNodes[node.x][node.y] = newNode;
      });
    });
    return newNodes;
  }

  updateBoard() {
    this.nodes = this.generateNewNodes();
    this.clear();
    this.draw();
  }

  createRandomNodes(num) {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    let maxYCoordinate = this.height / this.cellSize;
    let maxXCoordinate = this.width / this.cellSize;

    for (let i = 0; i < num; i++) {
      this.nodes[getRandomInt(maxXCoordinate)][
        getRandomInt(maxYCoordinate)
      ].giveLife();
    }
  }

  turnOffGrid() {
    this.grid = false;
  }
  traceNode = (x, y) => {
    try {
    // This stops TypeErrors if the event is fired and the x value is too large.
    if(x >= (this.width / this.cellSize)) x = (this.width / this.cellSize) - 1
      
    let node = this.nodes[x][y];

    // lastDrawn stops the mouseMove event from toggling
    // The same node twice or from toggling something called by the
    // Mousedown event. This has the unintended consequence of making
    // It impossible to delete the last node drawn. Unfortunately the
    // Things I've tried to mitigate this have been extremely non-performant.

    if (node != this.lastDrawn) {
      node.toggleLife();
      this.clear();
      this.draw();
      this.lastDrawn = node;
    }
  } catch(e) {
    // Nothing.
  }
  };

  init() {
    this.resetNodes();
    this.createRandomNodes(this.startingNodes);
    this.draw();
  }

  clear() {
    ctx.clearRect(0, 0, this.width, this.height);
  }
}
