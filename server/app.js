const express = require('express');
const cors = require('cors');
const path = require('path');
const { addMarker, getMarkers, getMyMarkers, deleteMarker } = require('./controller/markerController');
const { addIcon, getIcons, deleteIcon } = require('./controller/iconController');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock endpoints
app.post('/api/marker', upload.single('name'), addMarker);
app.delete('/api/marker/:id', deleteMarker);

app.get('/', (req, res) => {
  res.status(200).send('Icon Addedffff');
});

app.get('/api/map', getMarkers);
app.get('/api/mymap', getMyMarkers);

app.post('/api/icons', upload.single('icon'), addIcon);
app.get('/api/icons', getIcons);
app.delete('/api/icons/:id', deleteIcon);

// app.get('/api/bknp', (req, res) => {

//   res.json(markers);
// });

//🔰 For Production App
//app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  res.sendFile(path.join(__dirname, './public/build/index.html'));
});
//🔰 -------------------------

module.exports = app;
