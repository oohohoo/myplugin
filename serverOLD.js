const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
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


app.post('/create-component', (req, res) => {
  // Code to create new component goes here...

  // After new component is created, update components
  updateComponents();

  // Send response
  res.send('Component created successfully!');
});


/*************************************************************************/
/* SAVE COMPONENT
/*************************************************************************/
app.post('/save-component', (req, res) => {
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

  fs.writeFileSync(path.join(componentDir, `${componentName}.html`), linkedHtmlCode);
  fs.writeFileSync(path.join(componentDir, `${componentName}.css`), cssCode);
  fs.writeFileSync(path.join(componentDir, `${componentName}.js`), jsCode);

  generateComponents(); // Call the function after a new component is created


  res.send({ status: 'success' });
});


/* const { updateComponents } = require('./generateComponents.js'); */


/*************************************************************************/
/* DELETE COMPONENT
/*************************************************************************/
app.delete('/delete-component/:id', (req, res) => {
  const componentId = req.params.id;
  const componentPath = path.join(__dirname, 'public', 'components', componentId);
  const deletedComponentPath = path.join(__dirname, 'public', 'components', 'deleted', componentId);

  if (!fs.existsSync(componentPath)) {
    res.status(404).send('File not found');
    return;
  }

  // Move the component to the deleted folder instead of deleting it
  fs.rename(componentPath, deletedComponentPath, (err) => {
    if(err){
      console.error(err);
      res.status(500).json({ message: err.message });
      return;
    }

    // Update the components list in index.html
    updateComponents();

    res.json({ message: 'Component moved to deleted' });
  });
});


/*************************************************************************/
/* UNDO DELETE
/*************************************************************************/
app.post('/undo-delete', (req, res) => {
  const deletedComponentsDir = path.join(__dirname, 'public', 'components', 'deleted');
  const components = fs.readdirSync(deletedComponentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (components.length === 0) {
    res.status(404).send('No components to undo');
    return;
  }

  const lastDeletedComponent = components[components.length - 1];
  const deletedComponentPath = path.join(deletedComponentsDir, lastDeletedComponent);
  const componentPath = path.join(__dirname, 'public', 'components', lastDeletedComponent);

  // Move the last deleted component back to the components folder
  fs.rename(deletedComponentPath, componentPath, (err) => {
    if(err){
      console.error(err);
      res.status(500).json({ message: err.message });
      return;
    }

    // Update the components list in index.html
    updateComponents();

    res.json({ message: 'Component restored' });
  });
});




app.get('/deleted-items', (req, res) => {
  const deletedComponentsDir = path.join(__dirname, 'public', 'components', 'deleted');
  const components = fs.readdirSync(deletedComponentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  res.send(components);
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
/* EDIT COMPONENT
/*************************************************************************/