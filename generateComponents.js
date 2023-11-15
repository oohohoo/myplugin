
const fs = require('fs');
const path = require('path');

/*************************************************************************/
/* FUNCTION TO UPDATE COMPONENT
/*************************************************************************/
function updateComponents() {
  // Get the names of all directories in the components directory
  const componentDirs = fs.readdirSync('./public/components', { withFileTypes: true })
     .filter(dirent => dirent.isDirectory())
    .filter(dirent => dirent.name !== 'deleted') // Ignore the "deleted" directory
    .map(dirent => dirent.name);
  
/*************************************************************************/
/* GENERATE HTML FOR EACH COMPONENT
/*************************************************************************/
 /*  const componentHTML = componentDirs.map(dir => `
  <div class="grid-item" id="${dir.replace(/ /g, "-")}" data-component-name="${dir}">
    <h2 class="fulliframe" cms-post-title>${dir}</h2>
    <iframe data-src="./components/${dir}/${dir}.html" title="Live Preview"></iframe>
  <ul class="tags">
    <li>mobile</li>
    <li>media</li>
  </ul>
  <button class="close-button">Close</button>
  <div class="button-container">
    <button onclick="copyFileContent('components/${dir}/${dir}.html', this)">HTML</button>
    <button onclick="copyFileContent('components/${dir}/${dir}.js', this)">JS</button>
    <button onclick="copyFileContent('components/${dir}/${dir}.css', this)">CSS</button>
  </div>
</div>
`).join('\n'); */

const componentHTML = componentDirs.map(dir => `
<div class="grid-item" id="${dir.replace(/ /g, "-")}" data-component-name="${dir}">
  <h2 class="fulliframe" cms-post-title>${dir}</h2>
  <iframe data-src="./components/${dir}/${dir}.html" title="Live Preview"></iframe>
  <ul class="tags">
    <li>mobile</li>
    <li>media</li>
  </ul>
  <button class="close-button">Close</button>
  <div class="button-container">
    <button onclick="copyFileContent('components/${dir}/${dir}.html', this)">HTML</button>
    <button onclick="copyFileContent('components/${dir}/${dir}.js', this)">JS</button>
    <button onclick="copyFileContent('components/${dir}/${dir}.css', this)">CSS</button>
  </div>
  <button class="edit-button" onclick="editComponent('${dir}')">Edit</button> <!-- Add this line -->
</div>
`).join('\n');

/*************************************************************************/
/* READ THE INDEX HTML FILE
/*************************************************************************/
  let indexHTML = fs.readFileSync('./public/index.html', 'utf-8');

 /*************************************************************************/
/* DEFINE START AND END POINT OF AUTO-GENERATED COMPONENTS
/*************************************************************************/ 
  const startTag = '<!-- START AUTO-GENERATED COMPONENTS -->';
  const endTag = '<!-- END AUTO-GENERATED COMPONENTS -->';

/*************************************************************************/
/* FIND THE START AND END INDEXES OF THE AUTO-GENERATED COMPONENT SECTION
/*************************************************************************/
let startIndex = indexHTML.indexOf(startTag);
let endIndex = indexHTML.indexOf(endTag);

/*************************************************************************/
/* IF BOTH TAGS ARE FOUND, REPLACE THE EXISTING AUTO-GENERATED COMPONENTS
WITH NEW ONES
/*************************************************************************/
if (startIndex !== -1 && endIndex !== -1) {
    startIndex += startTag.length;
    indexHTML = indexHTML.substring(0, startIndex) + 
                componentHTML + 
                indexHTML.substring(endIndex, indexHTML.length);
}

/*************************************************************************/
/*WRITE THE UPDATED HTML BACK TO THE INDEX.HTML FILE
/*************************************************************************/
  fs.writeFileSync('./public/index.html', indexHTML);

/*************************************************************************/
/* CHCK IF THERE ARE DELETED ITEMS IN THE DELETED FOLDER AND DISPLAY THE UNDO BUTTON
/*************************************************************************/


/* const http = require('http');

function checkDeletedItems() {
  http.get('http://localhost:3000/deleted-items', (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
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

checkDeletedItems(); */


/* function checkDeletedItems() {
  fetch('/deleted-items', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    const undoButton = document.getElementById('undo-button');

    // If there are items in the deleted folder, display the undo button
    // and show the number of deleted items
    if (data.length > 0) {
      undoButton.textContent = `Undo (${data.length})`;
      undoButton.style.display = 'block';
    } else {
      undoButton.style.display = 'none';
    }
  });
}

checkDeletedItems(); */

}
/* NOVA FUNKCIJA EDIT COMPONENT*/
function editComponent(componentName) {
  // Fetch the component data from the server
  fetch(`/components/${componentName}`)
    .then(response => response.json())
    .then(data => {
      // Populate the edit form with the component data
      document.getElementById('edit-form-name').value = data.name;
      document.getElementById('edit-form-html').value = data.html;
      document.getElementById('edit-form-js').value = data.js;
      document.getElementById('edit-form-css').value = data.css;

      // Show the edit form
      document.getElementById('edit-form').style.display = 'block';
    });
}





module.exports = {
  generateComponents: function() {
/*************************************************************************/
/* RUN THE UPDATECOMPONENTS FUNCTION INITIALLY
/*************************************************************************/
    updateComponents();

    // Watch the components directory for changes
    fs.watch('./public/components', (eventType, filename) => {
      // Run the updateComponents function whenever a change is detected
      updateComponents();
    });
  },

  updateComponents: updateComponents
}