if (!CSS.supports('timeline-scope', '--foo')) {
  range.oninput = () =>
  document.body.style.setProperty('--range-value', range.value + '%');
}