const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const {
	generateComponents,
	updateComponents,
} = require("./generateComponents.js");
const chokidar = require("chokidar");

let componentDirs = fs
	.readdirSync(path.join(__dirname, "public", "components"), {
		withFileTypes: true,
	})
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

updateComponents();

app.use(express.static("public"));
app.use(express.json());

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Internal Server Error");
});

const addTagToComponent = (componentId, tag) => {
  let component;
  const componentPath = `./public/components/${componentId}/component.json`;

  fs.exists(componentPath, (exists) => {
    if (exists) {
      fs.readFile(componentPath, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        component = JSON.parse(data);
        component.tags.push(tag);
        fs.writeFile(componentPath, JSON.stringify(component, null, 2), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("TAG ADDED NAVODNO");
        });
      });
    } else {
      component = { tags: [] };
      component.tags.push(tag);
      fs.writeFile(componentPath, JSON.stringify(component, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("TAG ADDED NAVODNO");
      });
    }
  });
};

chokidar.watch("./public/components").on("all", (event, path) => {
  const componentHTML = updateComponents();
  wss.broadcast("componentAdded");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
  
  router.post('/components/:componentId/tags', (req, res) => {
	const { componentId } = req.params;
	const { tag } = req.body;
	try {
	  addTagToComponent(componentId, tag);
	  res.status(200).send('Tag added successfully');
	} catch (error) {
	  res.status(500).send('Error adding tag');
	}
  });
  
  app.use('/api', router); // Use the router


app.get("/tags/:componentId", (req, res) => {
	const componentId = req.params.componentId;
	console.log("GET /tags/" + componentId);
	const tagsFilePath = path.join(
		__dirname,
		"public",
		"components",
		componentId,
		"tags.json"
	);
	if (isValidComponentId(componentId)) {
		let tags = [];
		if (fs.existsSync(tagsFilePath)) {
			tags = JSON.parse(fs.readFileSync(tagsFilePath));
		} else {
			fs.writeFileSync(tagsFilePath, JSON.stringify(tags));
		}
		res.json(tags);
	} else {
		console.log("Invalid componentId " + componentId);
		res.status(404).send("Invalid componentId " + componentId);
	}
});

app.post("/tags/:componentId", (req, res) => {
	const componentId = req.params.componentId;
	const newTag = req.body.tag;
	const tagsFilePath = path.join(
		__dirname,
		"public",
		"components",
		componentId,
		"tags.json"
	);
	let tags = [];
	if (fs.existsSync(tagsFilePath)) {
		tags = JSON.parse(fs.readFileSync(tagsFilePath));
	}
	tags.push(newTag);
	fs.writeFile(tagsFilePath, JSON.stringify(tags), (err) => {
		if (err) {
			console.error(err);
			res.status(500).send({ error: "Failed to write to file" });
		} else {
			res.json(tags);
		}
	});
});

app.delete("/tags/:componentId/:tagIndex", (req, res) => {
	const componentId = req.params.componentId;
	const tagIndex = req.params.tagIndex;
	const tagsFilePath = path.join(
		__dirname,
		"public",
		"components",
		componentId,
		"tags.json"
	);
	let tags = [];
	if (fs.existsSync(tagsFilePath)) {
		tags = JSON.parse(fs.readFileSync(tagsFilePath));
		tags.splice(tagIndex, 1);
		fs.writeFileSync(tagsFilePath, JSON.stringify(tags));
	}
	res.json(tags);
});

/* SAVE COMPONENT */
app.put("/update-component/:oldName", (req, res, next) => {
	console.log("PUT /update-component/:oldName");

	let oldComponentName = req.params.oldName;
	let newComponentData = req.body;
	let newComponentName = newComponentData.componentName;
	let newComponentNameURL = newComponentName.replace(/ /g, "-");

	let oldComponentDir = path.join(
		__dirname,
		"public",
		"components",
		oldComponentName.replace(/ /g, "-")
	);
	let newComponentDir = path.join(
		__dirname,
		"public",
		"components",
		newComponentNameURL
	);

	if (!fs.existsSync(oldComponentDir)) {
		res.status(404).send({ status: "error", message: "Component not found" });
		return;
	}

	if (oldComponentName !== newComponentName) {
		fs.renameSync(oldComponentDir, newComponentDir);
	}

	let componentDir = newComponentDir;

	let linkedHtmlCode = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="${newComponentNameURL}.css">
    </head>
    <body>
      ${newComponentData.htmlCode}
      <script src="${newComponentNameURL}.js"></script>
    </body>
    </html>
  `;

	let componentId = newComponentName.replace(/ /g, "-");
	fs.writeFileSync(
		path.join(componentDir, `${componentId}.html`),
		linkedHtmlCode
	);
	fs.writeFileSync(
		path.join(componentDir, `${componentId}.css`),
		newComponentData.cssCode
	);
	fs.writeFileSync(
		path.join(componentDir, `${componentId}.js`),
		newComponentData.jsCode
	);

	componentDirs = fs
		.readdirSync(path.join(__dirname, "public", "components"), {
			withFileTypes: true,
		})
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
	console.log(
		`Component updated: ${newComponentName} (Component No. ${
			componentDirs.indexOf(newComponentName) + 1
		})`
	);

	updateComponents();

	try {
		res.send({ status: "success" });
	} catch (error) {
		next(error);
	}
});

app.post("/create-component", (req, res, next) => {
	console.log("POST /save-component");

	let oldComponentName = req.body.oldComponentName;
	let componentName = req.body.componentName;
	let componentNameURL = componentName.replace(/ /g, "-");
	let htmlCode = req.body.htmlCode;
	let cssCode = req.body.cssCode;
	let jsCode = req.body.jsCode;
	let excssCode = req.body.excssCode;
	let exjsCode = req.body.exjsCode;

	if (
		!componentName ||
		typeof componentName !== "string" ||
		componentName.trim() === ""
	) {
		res
			.status(400)
			.send({ status: "error", message: "Invalid component name" });
		return;
	}

	if (
		!htmlCode ||
		typeof htmlCode !== "string" ||
		!cssCode ||
		typeof cssCode !== "string" ||
		!jsCode ||
		typeof jsCode !== "string"
	) {
		res
			.status(400)
			.send({ status: "error", message: "Invalid HTML, CSS, or JS code" });
		return;
	}

	if (!oldComponentName) {
		oldComponentName = componentName;
	}

	if (oldComponentName !== componentName) {
		const oldComponentPath = path.join(
			__dirname,
			"public",
			"components",
			oldComponentName
		);
		const newComponentPath = path.join(
			__dirname,
			"public",
			"components",
			componentName
		);
		if (fs.existsSync(oldComponentPath)) {
			fs.renameSync(oldComponentPath, newComponentPath);
		}
	}

	let oldComponentDir = path.join(
		__dirname,
		"public",
		"components",
		oldComponentName.replace(/ /g, "-")
	);
	let newComponentDir = path.join(
		__dirname,
		"public",
		"components",
		componentNameURL
	);

	if (oldComponentName !== componentName) {
		if (fs.existsSync(oldComponentDir)) {
			fs.renameSync(oldComponentDir, newComponentDir);
		}
	} else {
		if (!fs.existsSync(newComponentDir)) {
			fs.mkdirSync(newComponentDir, { recursive: true });
		}
	}

	let componentDir = newComponentDir;

	let linkedHtmlCode = `
  <!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="${excssCode}.css">
    <link rel="stylesheet" type="text/css" href="${componentNameURL}.css">
  </head>
  <body>
    ${htmlCode}
    <script src="${exjsCode}.js"></script>
    <script src="${componentNameURL}.js"></script>
    </body>
  </html>
`;

	let componentId = componentName.replace(/ /g, "-");
	fs.writeFileSync(
		path.join(componentDir, `${componentId}.html`),
		linkedHtmlCode
	);
	fs.writeFileSync(path.join(componentDir, `${componentId}.css`), cssCode);
	fs.writeFileSync(path.join(componentDir, `${componentId}.js`), jsCode);

	componentDirs = fs
		.readdirSync(path.join(__dirname, "public", "components"), {
			withFileTypes: true,
		})
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
	console.log(
		`Component created: ${componentName} (Component No. ${
			componentDirs.indexOf(componentName) + 1
		})`
	);

	updateComponents();

	try {
		res.send({ status: "success" });
	} catch (error) {
		next(error);
	}
});

/* DELETE COMPONENT */
app.delete("/delete-component/:id", (req, res) => {
	const componentId = req.params.id;
	const componentPath = path.join(
		__dirname,
		"public",
		"components",
		componentId
	);

	if (!fs.existsSync(componentPath)) {
		res.status(404).send("File not found");
		return;
	}

	fs.rmdir(componentPath, { recursive: true }, (err) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: err.message });
			return;
		}

		updateComponents();

		componentDirs = fs
			.readdirSync(path.join(__dirname, "public", "components"), {
				withFileTypes: true,
			})
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
		res.json({ message: "Component deleted" });
	});
});

// Server.js
app.get("/components/:name", (req, res) => {
	const componentName = req.params.name;
	const componentNameURL = componentName.replace(/ /g, " ");
	const componentDir = path.join(
		__dirname,
		"public",
		"components",
		componentNameURL
	);
	if (!fs.existsSync(componentDir)) {
		res.status(404).send("Component not found");
		return;
	}
	const htmlCode = fs.readFileSync(
		path.join(componentDir, `${componentName}.html`),
		"utf-8"
	);
	const cssCode = fs.readFileSync(
		path.join(componentDir, `${componentName}.css`),
		"utf-8"
	);
	const jsCode = fs.readFileSync(
		path.join(componentDir, `${componentName}.js`),
		"utf-8"
	);
	res.send({
		componentName: componentName,
		htmlCode: htmlCode,
		cssCode: cssCode,
		jsCode: jsCode,
	});
});

app.get("/components", (req, res) => {
	const componentDirs = fs
		.readdirSync(path.join(__dirname, "public", "components"), {
			withFileTypes: true,
		})
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => ({
			name: dirent.name,
			time: fs
				.statSync(path.join(__dirname, "public", "components", dirent.name))
				.mtime.getTime(),
		}))
		.sort((a, b) => b.time - a.time)
		.map((dirent) => dirent.name);

	res.send(componentDirs);
});

/* RESET ON  RELOAD */
app.get("/", function (req, res) {
	updateComponents();
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

/* PUSH UPDATES - app ADDED*/
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = function (data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

chokidar.watch("./public/components").on("all", (event, path) => {
	const componentHTML = updateComponents();
	wss.broadcast("componentAdded");
});

const puppeteer = require("puppeteer");

app.post("/generate-screenshot/:name", async (req, res) => {
	const componentName = req.params.name.replace(/-/g, " ");
	const componentDir = path.join(
		__dirname,
		"public",
		"components",
		componentName
	);
	if (!fs.existsSync(componentDir)) {
		res.status(404).json("Component not found");
		return;
	}
	const screenshotPath = path.join(componentDir, "screenshot.jpg");
	if (!fs.existsSync(screenshotPath)) {
		const browser = await puppeteer.launch({ headless: "new" });
		const page = await browser.newPage();
		await page.goto(
			`http://localhost:${port}/components/${componentName}/${componentName}.html`
		);
		await page.waitForTimeout(1000);
		await page.screenshot({ path: screenshotPath });
		await browser.close();
	}
	/* res.send({ status: "success" }); */
	res.json({
		status: "success",
		screenshotPath: `/components/${componentName}/screenshot.jpg`,
	});
});
