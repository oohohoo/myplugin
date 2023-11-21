
const fs = require('fs');
const path = require('path');


/* UPDATE COMPONENT */
function updateComponents() {
  const componentDirs = fs.readdirSync('./public/components', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => dirent.name !== 'deleted')
    .map(dirent => ({
        name: dirent.name,
        time: fs.statSync('./public/components/' + dirent.name).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .map(dirent => dirent.name);
  

const componentHTML = componentDirs.map(dir => {
  let dirURL = dir.replace(/ /g, "-");
const id = dirURL;
return `
<div class="grid-item" id="${id}" data-component-name="${dir}">
  <h2 class="fulliframe" cms-post-title>${componentDirs.indexOf(dir) + 1}. ${dir}</h2>
  <iframe data-src="./components/${dirURL}/${dirURL}.html" title="Live Preview"></iframe>
  <ul class="tags">
    <li>mobile</li>
    <li>media</li>
  </ul>
  <button class="close-button">Close</button>
  <div class="button-container">
    <button onclick="copyFileContent('components/${id}/${id}.html', this)">HTML</button>
    <button onclick="copyFileContent('components/${id}/${id}.js', this)">JS</button>
    <button onclick="copyFileContent('components/${id}/${id}.css', this)">CSS</button>
  </div>
  <button class="edit-button" onclick="editComponent('${dir}')">Edit</button>
</div>
`;
}).join('\n');

  let indexHTML = fs.readFileSync('./public/index.html', 'utf-8');
  const startTag = '<!-- START AUTO-GENERATED COMPONENTS -->';
  const endTag = '<!-- END AUTO-GENERATED COMPONENTS -->';
let startIndex = indexHTML.indexOf(startTag);
let endIndex = indexHTML.indexOf(endTag);


if (startIndex !== -1 && endIndex !== -1) {
    startIndex += startTag.length;
    indexHTML = indexHTML.substring(0, startIndex) + 
                componentHTML + 
                indexHTML.substring(endIndex, indexHTML.length);
}

  fs.writeFileSync('./public/index.html', indexHTML);
  if (typeof window !== 'undefined' && typeof window.attachEventListeners === 'function') {
    setTimeout(window.attachEventListeners, 0);
  }
  if (typeof attachEventListeners === 'function') {
    attachEventListeners();
  }

/* UNDO */
/* 
const http = require('http');

function checkDeletedItems() {
  http.get('http://localhost:3000/deleted-items', (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      data = JSON.parse(data);
      const undoButton = document.getElementById('undo-button');

      if (data.length > 0) {
        undoButton.textContent = `Undo (${data.length})`;
        undoButton.style.display = 'block';
      } else {
        undoButton.style.display = 'none';
      }
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

checkDeletedItems();  */


/* function checkDeletedItems() {
  fetch('/deleted-items', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    const undoButton = document.getElementById('undo-button');

    if (data.length > 0) {
      undoButton.textContent = `Undo (${data.length})`;
      undoButton.style.display = 'block';
    } else {
      undoButton.style.display = 'none';
    }
  });
}

checkDeletedItems(); */

return componentHTML;
}

/* EDIT COMPONENT*/
exports.editComponent = function editComponent(componentName) {
  fetch(`/components/${componentName}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('edit-form-name').value = data.name;
      document.getElementById('edit-form-html').value = data.html;
      document.getElementById('edit-form-js').value = data.js;
      document.getElementById('edit-form-css').value = data.css;
      document.getElementById('edit-form').style.display = 'block';
    });
}

module.exports = {
  generateComponents: function() {

/* UPDATE COMP. INITIAL */
    updateComponents();
    fs.watch('./public/components', (eventType, filename) => {
      updateComponents();
    });
  },
  updateComponents: updateComponents
}
