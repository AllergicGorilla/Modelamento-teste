const iterations = 1000
const num_people = 100
const fps = 60;
const ms_per_frame = 1000/fps;

// Global variables
let canvas = document.getElementById('coronasim');
// Iteration number
let iter = 0;

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
  return response.json();
}

function render_frame(i, full_sim, ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  const frame = full_sim[i];
  let [susceptible, infected, removed] = [0, 0, 0];
  for (let p of frame) {
    let [x, y, s] = p
    let person = new Person(x, y, s);
    person.display(ctx);
    if (s == 0) susceptible++
    else if (s == 1) infected++
    else if (s == 2) removed++
  }
  document.getElementById('S').textContent = susceptible
  document.getElementById('I').textContent = infected
  document.getElementById('R').textContent = removed
}

async function renderSim() {
  const full_sim = await getSimData();

  let ctx = canvas.getContext('2d');
  function render_loop() {
    render_frame(iter, full_sim, ctx, canvas.width, canvas.height);
    iter++;
    if (iter < iterations)
      setTimeout(render_loop, ms_per_frame);
  }
  render_loop();
}



renderSim()
