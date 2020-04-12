class Person {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
  }
  display(ctx) {
    if (this.state == 0){
      ctx.fillStyle = 'green'
    } else if (this.state == 1) {
      ctx.fillStyle = 'red'
    } else if (this.state == 2) {
      ctx.fillStyle = 'blue'
    }
    ctx.strokeStyle = 'white'
    ctx.fillRect(this.x, this.y, 10, 10)
  }
}
