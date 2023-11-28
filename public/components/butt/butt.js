const button = document.querySelector('button');
button.addEventListener('click', () => {
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.textContent = 'I got clicked';
  
})