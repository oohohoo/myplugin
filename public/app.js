/* ADD NEW COMP - FORM */
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
	document.querySelectorAll(".grid-item").forEach(function (gridItem) {
		let iframe = gridItem.querySelector("iframe");
		let dataSrc = iframe.dataset.src; 

		gridItem.addEventListener("mouseover", function () {
			iframe.classList.remove("fade-out");
			let componentNameURL = gridItem.dataset.componentName.replace(/ /g, "-");
			iframe.src = `./components/${componentNameURL}/${componentNameURL}.html`;
			iframe.offsetHeight;
			iframe.classList.add("fade-in");
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.objectFit = "cover";
		});

		gridItem.addEventListener("mouseleave", function () {
			iframe.classList.remove("fade-in");
			iframe.src = `./components/${gridItem.dataset.componentName}/screenshot.jpg`;
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.objectFit = "cover";

			setTimeout(function () {
				iframe.classList.remove("fade-out");
			}, 500); 
		});
	});

	document.querySelectorAll(".close-button").forEach((button) => {
		button.addEventListener("click", (event) => {
			const component = event.target.closest(".grid-item");
			const componentName = component.dataset.componentName;
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
					window.location.reload();
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
	});

	const oldButtons = document.querySelectorAll(".edit-button");
	oldButtons.forEach(function (oldButton) {
		const newButton = oldButton.cloneNode(true);
		oldButton.parentNode.replaceChild(newButton, oldButton);

		newButton.addEventListener("click", function () {
			let oldComponentName = this.closest(".grid-item").dataset.componentName;
			document.getElementById("component-name").dataset.oldName = oldComponentName;
			let componentName = oldComponentName;
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
		document.getElementById("component-name").dataset.oldName = componentName;
		let htmlCode = document.getElementById("html-code").value;
		let cssCode = document.getElementById("css-code").value;
		let jsCode = document.getElementById("js-code").value;
		let componentId = componentName.replace(/ /g, "");


		// Validate component name
if (!componentName || typeof componentName !== 'string' || componentName.trim() === '') {
	alert('Invalid component name');
	return;
  }
  
  // Validate HTML, CSS, and JS code
  if (!htmlCode || typeof htmlCode !== 'string' || !cssCode || typeof cssCode !== 'string' || !jsCode || typeof jsCode !== 'string') {
	alert('Invalid HTML, CSS, or JS code');
	return;
  }
  


  let componentData = {
	oldComponentName: document.getElementById("component-name").dataset.oldName,
	id: componentId,
	componentName: componentName,
	htmlCode: htmlCode,
	cssCode: cssCode,
	jsCode: jsCode,
  };

  if (componentName && htmlCode && cssCode && jsCode) {
    fetch("/save-component", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(componentData),
    })
    .then((response) => response.json())
 

/*   fetch("/save-component", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(componentData),
}) */

			.then((data) => {
				if (data.status === "success") {
					fetch("/components")
						.then((response) => response.json())
						.then((components) => {
							fetch("/components")
								.then((response) => response.json())
								.then((components) => {
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


									// Add comp to DOM
									components.forEach(async (componentName) => {
										const componentElement = document.createElement("div");
										componentElement.className = "grid-item";
										componentElement.id = componentName.replace(/ /g, "-");
										componentElement.dataset.componentName = componentName;
										componentElement.innerHTML = `
    <h2 class="fulliframe" cms-post-title>${componentName.replace(/-/g, " ")}</h2>
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

										fetch(`/generate-screenshot/${componentName}`, {
											method: "POST",
										});
									});
									attachEventListeners();
								});
						});

					document.getElementById("component-name").value = "";
					document.getElementById("html-code").value = "";
					document.getElementById("css-code").value = "";
					document.getElementById("js-code").value = "";

					document.getElementById("component-form").reset();
					document
						.getElementById("side-panel")
						.classList.remove("side-panel-shown");
					document
						.getElementById("side-panel")
						.classList.add("side-panel-hidden");

					socket.onerror = function (error) {
						console.log(`WebSocket error: ${error}`);
					};

					socket.onmessage = function (event) {
						console.log("Server says: " + event.data);
					};
				}
			})

			.then((data) => {
				//	window.location.reload();
							})

							.catch((error) => {
								if (error.message === "Unexpected token E in JSON at position 0") {
									console.error("Error:", error, "The server responded with a non-JSON error message.");
								} else {
									console.error("Error:", error);
								}
							});
		} else {
			alert('All fields are required');
		  } 



			
			
	});

document
	.getElementById("close-form-button")
	.addEventListener("click", function () {
		document.getElementById("side-panel").classList.remove("side-panel-shown");
		document.getElementById("side-panel").classList.add("side-panel-hidden");
	});

/* ADD COMP*/
document.getElementById("add-component").addEventListener("click", function () {
	document.getElementById("side-panel").classList.add("side-panel-shown");
	document.getElementById("side-panel").classList.remove("side-panel-hidden");
});

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

/* DEL BUTTON */
document.querySelectorAll(".close-button").forEach((button) => {
	button.addEventListener("click", (event) => {
		const component = event.target.closest(".grid-item");
		const componentName = component.dataset.componentName;
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
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});
});

/* load unload iframe*/
document.querySelectorAll(".grid-item").forEach(function (gridItem) {
	let iframe = gridItem.querySelector("iframe");
	iframe.src = `./components/${gridItem.dataset.componentName}/screenshot.jpg`;


	gridItem.addEventListener("mouseover", function () {
		iframe.classList.remove("fade-out");
		let componentNameURL = gridItem.dataset.componentName.replace(/ /g, "-");
iframe.src = `./components/${componentNameURL}/${componentNameURL}.html`;
		iframe.offsetHeight;
		iframe.classList.add("fade-in");
	});

	gridItem.addEventListener("mouseleave", function () {
		iframe.classList.remove("fade-in");
		//iframe.classList.add("fade-out");
		iframe.src = `./components/${gridItem.dataset.componentName}/screenshot.jpg`;

		setTimeout(function () {
			iframe.classList.remove("fade-out");
		}, 500); 
	});
});


var gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(function(gridItem) {
    var iframe = gridItem.querySelector('iframe');

    iframe.src = `./components/${gridItem.dataset.componentName}/screenshot.jpg`;

    iframe.onload = function() {
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        var images = iframeDocument.querySelectorAll('img');
        images.forEach(function(imageElement) {
            imageElement.style.width = '100%';
            imageElement.style.height = '100%';
            imageElement.style.objectFit = 'cover';
   
        });
    };
});
