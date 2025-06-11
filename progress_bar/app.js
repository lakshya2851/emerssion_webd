const addBtn = document.getElementById('add-btn');
const progressContainer = document.getElementById('progress-bars');

addBtn.addEventListener('click', () => {
  // Create progress bar structure
  const bar = document.createElement('div');
  bar.className = 'progress-bar';

  const fill = document.createElement('div');
  fill.className = 'progress-fill';

  bar.appendChild(fill);
  progressContainer.appendChild(bar);

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    fill.style.width = '100%';
  });
});
