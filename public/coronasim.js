const iterations = 10000
const num_people = 10
let canvas = document.getElementById('coronasim');

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
async function getSimData() {
  const response = await fetch('/coronasim',
{
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    iterations: iterations,
    num_people: num_people,
    width: canvas.width,
    height: canvas.height})
});
  const full_sim = response.json();
  return full_sim;
}
let iter = 0;
async function renderSim() {
  const full_sim = await getSimData();
  console.log(full_sim)

  let ctx = canvas.getContext('2d');
  function loop() {
    render_frame(iter, full_sim, ctx, canvas.width, canvas.height);
    iter++;
    if (iter < iterations)
      setTimeout(loop, 20);
  }
  loop();
}

function render_frame(i, full_sim, ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  const frame = full_sim[i];
  for (let p of frame) {
    let [x, y, s] = p
    let person = new Person(x, y, s);
    person.display(ctx);
  }
}


renderSim()
