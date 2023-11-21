const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const { generateComponents, updateComponents } = require('./generateComponents.js'); // Import the generateComponents function


/*************************************************************************/
/* UPDATE COMPONENTS ON SERVER START
/*************************************************************************/
updateComponents(); 

app.use(express.static('public'));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


/* app.post('/create-component', (req, res) => {
  // Code to create new component goes here...

  // After new component is created, update components
  updateComponents();

  // Send response
  res.send('Component created successfully!');
});
 */

/*************************************************************************/
/* SAVE COMPONENT
/*************************************************************************/
app.post('/save-component', (req, res) => {
  console.log('POST /save-component');
  
  let componentName = req.body.componentName;
  let htmlCode = req.body.htmlCode;
  let cssCode = req.body.cssCode;
  let jsCode = req.body.jsCode;
  
  let componentDir = path.join(__dirname, 'public', 'components', componentName);
  
  fs.mkdirSync(componentDir, { recursive: true });
  
  // Add links to the CSS and JS files in the HTML code
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

  let componentId = componentName.replace(/ /g, "-");
  fs.writeFileSync(path.join(componentDir, `${componentId}.html`), linkedHtmlCode);
  fs.writeFileSync(path.join(componentDir, `${componentId}.css`), cssCode);
  fs.writeFileSync(path.join(componentDir, `${componentId}.js`), jsCode);

  console.log('Component created:', componentName);
  
  updateComponents(); // Call the function after a new component is created

  res.send({ status: 'success' });
});


/* const { updateComponents } = require('./generateComponents.js'); */


/*************************************************************************/
/* DELETE COMPONENT
/*************************************************************************/
app.delete('/delete-component/:id', (req, res) => {
  const componentId = req.params.id;
  const componentPath = path.join(__dirname, 'public', 'components', componentId); 

  if (!fs.existsSync(componentPath)) {
      res.status(404).send('File not found');
      return;
  }

 // Delete the component
 fs.rmdir(componentPath, { recursive: true }, (err) => {
  if(err){
    console.error(err);
    res.status(500).json({ message: err.message });
    return;
  }

  // Update the components list in index.html
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

/*************************************************************************/
/* RESET COMPONENTS ON EVERY RELOAD
/*************************************************************************/
app.get('/', function(req, res) {
  updateComponents();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


/*************************************************************************/
/* PUSH UPDATES WHEN APPLICATION ADDED
/*************************************************************************/


// Ensure WebSocket server is correctly set up
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
