const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { generateComponents, updateComponents } = require('./generateComponents.js'); // Import the generateComponents function

updateComponents(); 

app.use(express.static('public'));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


/* SAVE */
app.post('/save-component', (req, res) => {
  console.log('POST /save-component');
  
  let oldComponentName = req.body.oldComponentName;
  let componentName = req.body.componentName || oldComponentName;
  let htmlCode = req.body.htmlCode;
  let cssCode = req.body.cssCode;
  let jsCode = req.body.jsCode;

  let oldComponentDir = path.join(__dirname, 'public', 'components', oldComponentName);
  let newComponentDir = path.join(__dirname, 'public', 'components', componentName);

  if (fs.existsSync(oldComponentDir)) {
    fs.renameSync(oldComponentDir, newComponentDir);
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.html`), path.join(newComponentDir, `${componentName}.html`));
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.css`), path.join(newComponentDir, `${componentName}.css`));
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.js`), path.join(newComponentDir, `${componentName}.js`));
  } else {
    fs.mkdirSync(newComponentDir, { recursive: true });
  }

  if (oldComponentName !== componentName) {
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.html`), path.join(newComponentDir, `${componentName}.html`));
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.css`), path.join(newComponentDir, `${componentName}.css`));
    fs.renameSync(path.join(newComponentDir, `${oldComponentName}.js`), path.join(newComponentDir, `${componentName}.js`));
  }
  
  let linkedHtmlCode = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="${componentName}.css">
    </head>
    <body>
      ${htmlCode}
      <script src="${componentName}.js"></script>
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(newComponentDir, `${componentName}.html`), linkedHtmlCode);
  fs.writeFileSync(path.join(newComponentDir, `${componentName}.css`), cssCode);
  fs.writeFileSync(path.join(newComponentDir, `${componentName}.js`), jsCode);

  console.log('Component created:', componentName);
  
  generateComponents(); 

  res.send({ status: 'success' });
});


/* DELETE */
app.delete('/delete-component/:id', (req, res) => {
  const componentId = req.params.id;
  const componentPath = path.join(__dirname, 'public', 'components', componentId); 

  if (!fs.existsSync(componentPath)) {
      res.status(404).send('File not found');
      return;
  }

 fs.rmdir(componentPath, { recursive: true }, (err) => {
  if(err){
    console.error(err);
    res.status(500).json({ message: err.message });
    return;
  }

  updateComponents();

  res.json({ message: 'Component deleted' });
});
});

// Server.js
app.get('/components/:name', (req, res) => {
  const componentName = req.params.name;
  const componentDir = path.join(__dirname, 'public', 'components', componentName);
  if (!fs.existsSync(componentDir)) {
    res.status(404).send('Component not found');
    return;
  }
  const htmlCode = fs.readFileSync(path.join(componentDir, `${componentName}.html`), 'utf-8');
  const cssCode = fs.readFileSync(path.join(componentDir, `${componentName}.css`), 'utf-8');
  const jsCode = fs.readFileSync(path.join(componentDir, `${componentName}.js`), 'utf-8');
  res.send({
    componentName: componentName,
    htmlCode: htmlCode,
    cssCode: cssCode,
    jsCode: jsCode
  });
});

app.get('/components', (req, res) => {
  const componentDirs = fs.readdirSync(path.join(__dirname, 'public', 'components'), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({
        name: dirent.name,
        time: fs.statSync(path.join(__dirname, 'public', 'components', dirent.name)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .map(dirent => dirent.name);

  res.send(componentDirs);
});

/* RESET ON RELOAD */
app.get('/', function(req, res) {
  updateComponents();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/* PUSH UPDATES */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

fs.watch('./public/components', (eventType, filename) => {
  const componentHTML = updateComponents();
  wss.broadcast(JSON.stringify(componentHTML));
});

const puppeteer = require('puppeteer');

app.post('/generate-screenshot/:name', async (req, res) => {
	const componentName = req.params.name;
	const componentDir = path.join(__dirname, 'public', 'components', componentName);
	if (!fs.existsSync(componentDir)) {
		res.status(404).send('Component not found');
		return;
	}
	const screenshotPath = path.join(componentDir, 'screenshot.jpg');
	if (!fs.existsSync(screenshotPath)) {
	    const browser = await puppeteer.launch();
	    const page = await browser.newPage();
	    await page.goto(`http://localhost:${port}/components/${componentName}/${componentName}.html`);
	    await page.screenshot({ path: screenshotPath });
	    await browser.close();
	}
	res.send({ status: 'success' });
});