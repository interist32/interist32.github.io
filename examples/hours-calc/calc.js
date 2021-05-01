const startTimeEl = document.querySelector('.time-start');
const timeDiffEl = document.querySelector('.time-diff');
const resultEl = document.querySelector('.result');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  const [startH, startM] = startTimeEl.value.split(':')
  const [diffH, diffM] = timeDiffEl.value.split(':');

  const hours = parseInt(startH) + parseInt(diffH) % 24;
  const minutes = parseInt(startM) + parseInt(diffM);

  const resultHours = hours + Math.floor(minutes / 60);
  const resultMinutes = minutes % 60;

  resultEl.textContent = `${resultHours}:${resultMinutes}`;
});