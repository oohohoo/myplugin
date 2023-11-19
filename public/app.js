/* ADD NEW COMPONENT - FORM SUBMIT */

// Ensure WebSocket connection is correctly established and updates are received
let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (e) {
	console.log("[open] Connection established");
	console.log("Sending to server");
	socket.send("My name is John");
};

socket.onmessage = function (event) {
	console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log(
			`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
		);
	} else {
		console.log("[close] Connection died");
	}
};

socket.onerror = function (error) {
	console.log(`[error] ${error.message}`);
};

function attachEventListeners() {
	// Add event listeners to each .grid-item
	document.querySelectorAll(".grid-item").forEach(function (gridItem) {
		let iframe = gridItem.querySelector("iframe");
		let dataSrc = iframe.dataset.src; // Correctly access the data-src attribute

		// On mouseover, set the src attribute of the iframe
		gridItem.addEventListener("mouseover", function () {
			iframe.src = dataSrc;
		});

		// On mouseleave, remove the src attribute of the iframe
		gridItem.addEventListener("mouseleave", function () {
			iframe.src = "";
		});
	});

	// Add event listeners to each .close-button
	document.querySelectorAll(".close-button").forEach((button) => {
		button.addEventListener("click", (event) => {
			// Get the parent component of the clicked button
			const component = event.target.closest(".grid-item");
			// Extract the component's unique name
			const componentName = component.dataset.componentName;
			// Send a DELETE request to the server
			fetch(`/delete-component/${componentName}`, {
				method: "DELETE",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Error: ${response.statusText}`);
					}
					return response.json();
				})
				.then((data) => {
					console.log("Success:", data);
					// Refresh the window after successful deletion
					window.location.reload();
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
	});

	// Add event listeners to each .edit-button
	const oldButtons = document.querySelectorAll(".edit-button");
	oldButtons.forEach(function (oldButton) {
		const newButton = oldButton.cloneNode(true);
		oldButton.parentNode.replaceChild(newButton, oldButton);

		newButton.addEventListener("click", function () {
			let componentName = this.closest(".grid-item").dataset.componentName;
			fetch(`/components/${componentName}`)
				.then((response) => response.json())
				.then((data) => {
					document.getElementById("component-name").value = data.componentName;
					document.getElementById("component-name").dataset.oldName = data.componentName;
					document.getElementById("html-code").value = data.htmlCode;
					document.getElementById("css-code").value = data.cssCode;
					document.getElementById("js-code").value = data.jsCode;
					document
						.getElementById("side-panel")
						.classList.add("side-panel-shown");
					document
						.getElementById("side-panel")
						.classList.remove("side-panel-hidden");
				});
		});
	});
}

document
	.getElementById("component-form")
	.addEventListener("submit", function (event) {
		attachEventListeners();
		event.preventDefault();

		let oldComponentName = document.getElementById("component-name").dataset.oldName;
		let componentName = document.getElementById("component-name").value;
		let htmlCode = document.getElementById("html-code").value;
		let cssCode = document.getElementById("css-code").value;
		let jsCode = document.getElementById("js-code").value;
		let componentId = componentName.replace(/ /g, "");

		let componentData = {
		  oldComponentName: oldComponentName,
			id: componentId,
			componentName: componentName,
			htmlCode: htmlCode,
			cssCode: cssCode,
			jsCode: jsCode,
		};

		fetch("/save-component", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(componentData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "success") {
					// Fetch the updated list of components and refresh the page
					fetch("/components")
						.then((response) => response.json())
						.then((components) => {
							// Fetch the updated list of components and refresh the page
							fetch("/components")
								.then((response) => response.json())
								.then((components) => {
									// Remove all existing components from the DOM
									const componentContainer = document.getElementById(
										"component-container"
									);
									if (!componentContainer) {
										console.error(
											'No element with id "component-container" found'
										);
										return;
									}
									while (componentContainer.firstChild) {
										componentContainer.removeChild(
											componentContainer.firstChild
										);
									}


									// Add all components to the DOM
									components.forEach(async (componentName) => {
										const componentElement = document.createElement("div");
										componentElement.className = "grid-item";
										componentElement.id = componentName.replace(/ /g, "-");
										componentElement.dataset.componentName = componentName;
										componentElement.innerHTML = `
    <h2 class="fulliframe" cms-post-title>${componentName}</h2>
    <iframe data-src="./components/${componentName}/${componentName}.html" title="Live Preview"></iframe>
    <ul class="tags">
      <li>mobile</li>
      <li>media</li>
    </ul>
    <button class="close-button">Close</button>
    <div class="button-container">
      <button onclick="copyFileContent('components/${componentName}/${componentName}.html', this)">HTML</button>
      <button onclick="copyFileContent('components/${componentName}/${componentName}.js', this)">JS</button>
      <button onclick="copyFileContent('components/${componentName}/${componentName}.css', this)">CSS</button>
    </div>
    <button class="edit-button" onclick="editComponent('${componentName}')">Edit</button>
  `;
										componentContainer.appendChild(componentElement);

										// Request the server to generate a screenshot for the iframe content
										fetch(`/generate-screenshot/${componentName}`, {
											method: "POST",
										});
									});
									attachEventListeners();
								});
						});

					// Reset the form fields
					document.getElementById("component-name").value = "";
					document.getElementById("html-code").value = "";
					document.getElementById("css-code").value = "";
					document.getElementById("js-code").value = "";

					// Close the form and reset its fields
					document.getElementById("component-form").reset();
					document
						.getElementById("side-panel")
						.classList.remove("side-panel-shown");
					document
						.getElementById("side-panel")
						.classList.add("side-panel-hidden");

					// Log errors
					socket.onerror = function (error) {
						console.log(`WebSocket error: ${error}`);
					};

					// Log messages from the server
					socket.onmessage = function (event) {
						console.log("Server says: " + event.data);
					};
				}
			})

			.then((data) => {
				// Refresh the window after successful save
			//	window.location.reload();
				console.log(
					"MOŽDA NADOGRADITI DA SE U BUDUĆNOSTI NE REFRESHA CILI PAGE"
				);
			})

			.catch((error) => console.error("Error:", error));
	});

document
	.getElementById("close-form-button")
	.addEventListener("click", function () {
		document.getElementById("side-panel").classList.remove("side-panel-shown");
		document.getElementById("side-panel").classList.add("side-panel-hidden");
	});

/*************************************************************************/
/* ADD COMPONENT - PROVJERI
/*************************************************************************/

document.getElementById("add-component").addEventListener("click", function () {
	document.getElementById("side-panel").classList.add("side-panel-shown");
	document.getElementById("side-panel").classList.remove("side-panel-hidden");
});

// Remove all existing event listeners
const oldButtons = document.querySelectorAll(".edit-button");
oldButtons.forEach(function (oldButton) {
	const newButton = oldButton.cloneNode(true);
	oldButton.parentNode.replaceChild(newButton, oldButton);

	newButton.addEventListener("click", function () {
		let componentName = this.closest(".grid-item").dataset.componentName;
		fetch(`/components/${componentName}`)
			.then((response) => response.json())
			.then((data) => {
				document.getElementById("component-name").value = data.componentName;
				document.getElementById("html-code").value = data.htmlCode;
				document.getElementById("css-code").value = data.cssCode;
				document.getElementById("js-code").value = data.jsCode;
				document.getElementById("side-panel").classList.add("side-panel-shown");
				document
					.getElementById("side-panel")
					.classList.remove("side-panel-hidden");
			});
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
		.then((response) => response.text())
		.then((data) => {
			if (data.trim() === "") {
				// Disable the button and return early if the file is empty
				button.disabled = true;
				return;
			}

			navigator.clipboard.writeText(data).then(
				function () {
					// Store the original button text in a data attribute, if not already stored
					if (!button.dataset.originalText) {
						button.dataset.originalText = button.textContent;
					}

					// Change the button text and color when the copy is successful
					button.textContent = "Copied!";
					button.style.backgroundColor = "red";
					console.log("Copying to clipboard was successful!");

					// Add the 'clicked' class to trigger the click animation
					button.classList.add("clicked");

					// Reset the button after 2 seconds
					setTimeout(function () {
						// Retrieve the original button text from the data attribute
						button.textContent = button.dataset.originalText;
						button.style.backgroundColor = ""; // Set to default color

						// Add the 'reset' class to trigger the reset animation
						button.classList.add("reset");

						// Remove the 'clicked' and 'reset' classes after the animation is complete
						setTimeout(function () {
							button.classList.remove("clicked");
							button.classList.remove("reset");
						}, 500); // Adjust the duration to match the animation duration
					}, 2000);
				},
				function (err) {
					console.error("Could not copy text: ", err);
				}
			);
		});
}

function resetButtons() {
	document
		.querySelectorAll(".button-container button")
		.forEach(function (button) {
			if (button.dataset.originalText) {
				button.textContent = button.dataset.originalText;
			}
			button.style.backgroundColor = "";
		});
}

// Check each file when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
	attachEventListeners();
	const buttons = document.querySelectorAll(".button-container button");
	buttons.forEach(function (button) {
		const filePath = button.getAttribute("onclick").split("'")[1];
		fetch(filePath)
			.then((response) => response.text())
			.then((data) => {
				if (data.trim() === "") {
					button.disabled = true;
				}
			});
	});

	/* setTimeout(resetButtons, 0); */
});

/*************************************************************************/
/* DELETE BUTTON - CLOSE BUTTON!!
/*************************************************************************/

document.querySelectorAll(".close-button").forEach((button) => {
	button.addEventListener("click", (event) => {
		// Get the parent component of the clicked button
		const component = event.target.closest(".grid-item");
		// Extract the component's unique name
		const componentName = component.dataset.componentName;
		// Send a DELETE request to the server
		fetch(`/delete-component/${componentName}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);
				// Refresh the window after successful deletion
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});
});

/* load unload iframe*/
// Add event listeners to each .grid-item
document.querySelectorAll(".grid-item").forEach(function (gridItem) {
	let iframe = gridItem.querySelector("iframe");
	let dataSrc = iframe.dataset.src; // Correctly access the data-src attribute

	// On mouseover, set the src attribute of the iframe and remove the fade-out class
	gridItem.addEventListener("mouseover", function () {
		iframe.classList.remove("fade-out");
		iframe.src = dataSrc;
		// Force a reflow by accessing the offsetHeight property
		iframe.offsetHeight;
		// Add the fade-in class to trigger the fade-in animation
		iframe.classList.add("fade-in");
	});

	// On mouseleave, add the fade-out class to trigger the fade-out animation
	gridItem.addEventListener("mouseleave", function () {
		iframe.classList.remove("fade-in");
		iframe.classList.add("fade-out");
		iframe.src = "";

		// Remove the fade-out class after the transition is complete
		setTimeout(function () {
			iframe.classList.remove("fade-out");
		}, 500); // Adjust the duration to match the transition duration
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

 document.querySelectorAll('.grid-item').forEach(button => {
	button.addEventListener('click', function () {
	  const iframeSrc = this.querySelector('iframe').src; // Get the src from the smaller iframe
	  document.getElementById('fullscreen-iframe').src = iframeSrc; // Set the src of the fullscreen iframe
	  document.getElementById('fullscreen-container').classList.remove('hidden');
	});
  });
  
  document.getElementById('close-button').addEventListener('click', function () {
	document.getElementById('fullscreen-container').classList.add('hidden');
	document.getElementById('fullscreen-iframe').src = '';
  });
  
