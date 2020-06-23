class Node {
    constructor(x, y, width, height, monochrome = true) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.alive = false;
      this.generation = 0;
      this.monochrome = monochrome;
    }
    giveLife() {
      this.alive = true;
    }
    takeLife() {
      this.alive = false;
      this.generation = 0;
    }
    survives(num) {
      this.giveLife();
      this.generation = num + 1;
    }
    get drawX() {
      return this.x * this.width;
    }
    get drawY() {
      return this.y * this.height;
    }
    draw() {
      if (!this.monochrome) {
        let color = this.generation;
        if (color > 4) {
          this.generation = 4;
          color = 4;
        }
        ctx.fillStyle = this.colors[color];
      }
      ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
    }
  }
  
  Node.prototype.colors = ["black", "green", "red", "blue", "purple"];