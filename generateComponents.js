const fs = require("fs");
const path = require("path");

/* UPDATE COMPONENT */
function updateComponents() {
	const componentDirs = fs
		.readdirSync("./public/components", { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.filter((dirent) => dirent.name !== "deleted")
		.map((dirent) => ({
			name: dirent.name,
			time: fs.statSync("./public/components/" + dirent.name).mtime.getTime(),
		}))
		.sort((a, b) => b.time - a.time)
		.map((dirent) => dirent.name);

	const componentHTML = componentDirs
		.map((dir, index) => {
			let dirURL = dir.replace(/ /g, "-");
			const id = dirURL;
			return `
<div class="grid-item" id="${id}" data-component-name="${dir}">

<button onclick="generateAndDisplayScreenshot('componentName')">Generate Screenshot</button>
<img id="screenshotImage" src="" alt="Component Screenshot">

<div class="_box">
  <label for="tagList">Add tag (Press ENTER to Add new Tag)</label>
  <input type="text" class="newTag" />
  <ul class="tagList">
    <!-- All TagList Here! -->
  </ul>  
</div>
<h2 class="fulliframe" cms-post-title>${dir}</h2>
<h2 class="fulliframe" cms-post-title>${componentDirs.length - index}</h2>
<div class="preloader"></div>
  <iframe  data-src="./components/${dirURL}/${dirURL}.html" title="Live Preview"></iframe>
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
		})
		.join("\n");

	let indexHTML = fs.readFileSync("./public/index.html", "utf-8");
	const startTag = "<!-- START AUTO-GENERATED COMPONENTS -->";
	const endTag = "<!-- END AUTO-GENERATED COMPONENTS -->";
	let startIndex = indexHTML.indexOf(startTag);
	let endIndex = indexHTML.indexOf(endTag);

	if (startIndex !== -1 && endIndex !== -1) {
		startIndex += startTag.length;
		indexHTML =
			indexHTML.substring(0, startIndex) +
			componentHTML +
			indexHTML.substring(endIndex, indexHTML.length);
	}

	fs.writeFileSync("./public/index.html", indexHTML);
	if (
		typeof window !== "undefined" &&
		typeof window.attachEventListeners === "function"
	) {
		setTimeout(window.attachEventListeners, 0);
	}
	if (typeof attachEventListeners === "function") {
		attachEventListeners();
	}
	return componentHTML;
}

/* EDIT C*/
exports.editComponent = function editComponent(componentName) {
	fetch(`/components/${componentName}`)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("edit-form-name").value = data.name;
			document.getElementById("edit-form-html").value = data.html;
			document.getElementById("edit-form-js").value = data.js;
			document.getElementById("edit-form-css").value = data.css;
			document.getElementById("edit-form").style.display = "block";
		});
};

module.exports = {
	generateComponents: function () {
		/* UPDATE C  */
		updateComponents();
		fs.watch("./public/components", (eventType, filename) => {
			updateComponents();
		});
	},
	updateComponents: updateComponents,
};
