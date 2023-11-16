/*************************************************************************/
/* ADD NEW COMPONENT - FORM SUBMIT
/*************************************************************************/

document.getElementById('component-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let componentName = document.getElementById('component-name').value;
  let htmlCode = document.getElementById('html-code').value;
  let cssCode = document.getElementById('css-code').value;
  let jsCode = document.getElementById('js-code').value;

    // create an ID by replacing spaces in componentName with underscores
    let componentId = componentName.replace(/ /g, "");
    console.log("componentId: ", componentId); // Log componentId


  let componentData = {
    id: componentId,
    componentName: componentName,
    htmlCode: htmlCode,
    cssCode: cssCode,
    jsCode: jsCode
  };

    // Select the .grid-item element and assign the ID
    let gridItem = document.querySelector('.grid-item');
    if (gridItem) {
      gridItem.id = componentId;
    }
});





/*************************************************************************/
/* OPEN CLOSE FORM
/*************************************************************************/
/*   document.querySelector('#show-form-button').addEventListener('click', function() {
    let form = document.querySelector('#component-form');
    form.style.display = 'block';
    setTimeout(function(){
      form.classList.add('visible');
    }, 50);
  });
  
  document.querySelector('#close-form-button').addEventListener('click', function() {
    let form = document.querySelector('#component-form');
    form.classList.remove('visible');
    setTimeout(function(){
      form.style.display = 'none';
    }, 500); // this should be the same as the transition duration in the CSS
  });

 */

  /*************************************************************************/
/* ADD COMPONENT - PROVJERI
/*************************************************************************/

document.getElementById('add-component').addEventListener('click', function() {
  document.getElementById('side-panel').classList.add('side-panel-shown');
  document.getElementById('side-panel').classList.remove('side-panel-hidden');
});

document.querySelectorAll('.edit-component').forEach(function(button) {
  button.addEventListener('click', function() {
    document.getElementById('side-panel').classList.add('side-panel-shown');
    document.getElementById('side-panel').classList.remove('side-panel-hidden');
    // Load the component's data into the form
  });
});




/*************************************************************************/
/* COPY TO CLIPBOARD
/*************************************************************************/
  function copyFileContent(filePath, button) {
    // Reset all buttons
    resetButtons();

    // Store the original button text in a data attribute, if not already stored
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }

    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        if (data.trim() === '') {
          // Disable the button and return early if the file is empty
          button.disabled = true;
          return;
        }

        navigator.clipboard.writeText(data).then(function() {
          // Change the button text and color when the copy is successful
          button.textContent = 'Copied!';
          button.style.backgroundColor = 'red';
          console.log('Copying to clipboard was successful!');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
      });
  }

  function resetButtons() {
    document.querySelectorAll('.button-container button').forEach(function(button) {
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
      }
      button.style.backgroundColor = '';
    });
  }

  // Check each file when the page is loaded
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(function(button) {
      const filePath = button.getAttribute('onclick').split("'")[1];
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          if (data.trim() === '') {
            button.disabled = true;
          }
        });
    });
  });



/*************************************************************************/
/* DELETE BUTTON - CLOSE BUTTON!!
/*************************************************************************/

  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (event) => {
      // Get the parent component of the clicked button
      const component = event.target.closest('.grid-item');
      // Extract the component's unique name
      const componentName = component.dataset.componentName;
      // Send a DELETE request to the server
      fetch(`/delete-component/${componentName}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Refresh the window after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });
  




/*************************************************************************/
/* FILTER & SEARCH
/*************************************************************************/

function filterItems() {
    var query = document.getElementById('search-input').value.toLowerCase();
    var checkboxes = document.querySelectorAll('#tag-filter input[type=checkbox]');
    var tags = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
  
    var allItems = document.querySelectorAll('.grid-item');
    allItems.forEach(function(item) {
      var name = item.querySelector('h2').textContent.toLowerCase();
      var itemTags = Array.from(item.querySelectorAll('.tags li')).map(li => li.textContent);
  
      if ((tags.length === 0 || tags.some(tag => itemTags.includes(tag))) && (!query || name.includes(query))) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Event listeners for checkboxes and search input
  var checkboxes = document.querySelectorAll('#tag-filter input[type=checkbox]');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', filterItems);
  });
  document.getElementById('search-input').addEventListener('input', filterItems);
  
  // Button to clear search field
  document.getElementById('clear-search').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    filterItems();
  });





/*************************************************************************/
/* FULLSCREEN IFRAME 
/*************************************************************************/

/* document.querySelectorAll('.grid-itexxm').forEach(button => {
  button.addEventListener('click', function () {
    const iframeSrc = this.querySelector('iframe').src; // Get the src from the smaller iframe
    document.getElementById('fullscreen-iframe').src = iframeSrc; // Set the src of the fullscreen iframe
    document.getElementById('fullscreen-container').classList.remove('hidden');
  });
});

document.getElementById('close-button').addEventListener('click', function () {
  document.getElementById('fullscreen-container').classList.add('hidden');
});
 */



/* load unload iframe*/
// Add event listeners to each .grid-item
document.querySelectorAll('.grid-item').forEach(function(gridItem) {
  let iframe = gridItem.querySelector('iframe');
  let dataSrc = iframe.dataset.src;  // Correctly access the data-src attribute

  // On mouseover, set the src attribute of the iframe
  gridItem.addEventListener('mouseover', function() {
    iframe.src = dataSrc;
  });

  // On mouseleave, remove the src attribute of the iframe
  gridItem.addEventListener('mouseleave', function() {
    iframe.src = '';
  });
});




/* UNDO BUTTON */

document.getElementById('undo-button').addEventListener('click', function() {
  fetch('/undo-delete', {
      method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response from the server
      if (data.message === 'Component restored') {
        console.log(data); // Log data received from the server
          // If the component was restored, you may want to update your components list
          // and hide the undo button again
          document.getElementById('undo-button').style.display = 'none';
       //   updateComponents();
      }
  });
});

function deleteComponent(componentId) {
  console.log('deleteComponent called'); // This should log when a component is deleted

  fetch('/delete-component/' + componentId, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response from the server
      if (data.message === 'Component moved to deleted') {
        console.log(data); // Log data received from the server

          // If the component was moved to the deleted folder, show the undo button
         /*  document.getElementById('undo-button').style.display = 'block'; */
          //updateComponents();
      }
  });
}



/* EDIT COMPONENT */

document.getElementById('save-button').addEventListener('click', function() {
  const componentName = document.getElementById('edit-form-name').value;
  const html = document.getElementById('edit-form-html').value;
  const js = document.getElementById('edit-form-js').value;
  const css = document.getElementById('edit-form-css').value;

  fetch(`/components/${componentName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: componentName, html: html, js: js, css: css }),
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    alert('Component updated successfully!');
  })
  .catch(error => console.error('There has been a problem with your fetch operation: ', error));
});