/* ADD NEW COMPONENT - FORM SUBMIT */

// Ensure WebSocket connection is correctly established and updates are received
let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

document.getElementById('component-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let componentName = document.getElementById('component-name').value;
  let htmlCode = document.getElementById('html-code').value;
  let cssCode = document.getElementById('css-code').value;
  let jsCode = document.getElementById('js-code').value;
  let componentId = componentName.replace(/ /g, "");

  let componentData = {
    id: componentId,
    componentName: componentName,
    htmlCode: htmlCode,
    cssCode: cssCode,
    jsCode: jsCode
  };

  fetch('/save-component', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      // Fetch the updated list of components and refresh the page
      fetch('/components')
        .then(response => response.json())
        .then(components => {
          // Remove all existing components from the DOM
          const componentContainer = document.getElementById('component-container');
          if (componentContainer) {
            while (componentContainer.firstChild) {
              componentContainer.removeChild(componentContainer.firstChild);
            }
          }

          // Add each component in the updated list to the DOM
          components.forEach(component => {
            const componentElement = document.createElement('div');
            componentElement.textContent = component;
            componentContainer.appendChild(componentElement);
          });
        });

      // Log errors
      socket.onerror = function(error) {
        console.log(`WebSocket error: ${error}`);
      };

      // Log messages from the server
      socket.onmessage = function(event) {
        console.log('Server says: ' + event.data);
      };
    }
  })
  .catch(error => console.error('Error:', error));
});

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

/* document.getElementById('undo-button').addEventListener('click', function() {
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
         // document.getElementById('undo-button').style.display = 'block'; 
          //updateComponents();
      }
  });
}
 */
