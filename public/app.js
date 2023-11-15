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

  fetch('/save-component', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
})
.then(response => response.json()) // Parse the response from the server as JSON
.then(data => {
  console.log(data);
  
  if (data.status === 'success') {
    let newGridItem = document.createElement('div');
    newGridItem.className = 'grid-item';
    newGridItem.id = componentId;
    document.querySelector('.grid-container').appendChild(newGridItem);
  }
})
.catch(error => console.error('Error:', error));

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

/* DELETE BUTTON*/


/* DELETE BUTTON */

/* document.querySelectorAll(".delbut").forEach(function(deleteButton){
  deleteButton.addEventListener("click", function(){

    console.log('Button clicked');

    var confirmation = window.confirm("Do you want to delete this component?");
    if (confirmation) {
      var component = deleteButton.closest(".grid-item");
      var componentName = component.getAttribute("data-component-name");
      
      if (componentName) {
        let urlComponentName = componentName.replace(/ /g, '-');
        let url = `/delete-component/${urlComponentName}`;

        fetch(url, {
          method: 'DELETE',
        }).then((response) => {
          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }
          return response.text();
        }).then((data) => {
          // handle successful deletion
          // remove the component from the DOM
          component.remove();
        }).catch((error) => {
          console.error('Error:', error);
        });
      }
    }
  });
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



/* document.querySelectorAll(".delbut").forEach(function(deleteButton){
  deleteButton.addEventListener("click", function(){

    console.log('Button clicked');

    var confirmation = window.confirm("Do you want to delete this component?");
    var componentName = component.getAttribute("data-component-name");
    if (componentName) {
      var component = deleteButton.closest(".grid-item");
      var componentName = component.getAttribute("data-component-name");
      let urlComponentName = componentName.replace(/ /g, '-');
      let url = `/delete-component/${urlComponentName}`;

      fetch(url, {
        method: 'DELETE',
      }).then((response) => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.text();
      }).then((data) => {
        // handle successful deletion
        // remove the component from the DOM
        component.remove();
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  });
});
 */

/* OLD CODE*/
/* document.querySelectorAll(".delbut").forEach(function(deleteButton){
  deleteButton.addEventListener("click", function(){

    console.log('Button clicked');


    var confirmation = window.confirm("Do you want to delete this component?");
      if (confirmation) {
          var component = deleteButton.closest(".grid-item");
          var componentId = component.id;


         fetch('/delete-component/' + componentId, {
    method: 'DELETE',


 }).then((response) => {
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.text();  // Change this line
}).then((data) => {
    // handle successful deletion
    // remove the component from the DOM
    component.remove();
}).catch((error) => {
    console.error('Error:', error);
});
      }
  });
});  */

/* document.getElementById("deleteButton").addEventListener("click", function(){
  var confirmation = window.confirm("Do you want to delete this component?");
  if (confirmation) {
    fetch('delete-component/ghf')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // handle data
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }
}); */



