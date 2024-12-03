require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(`mongodb+srv://${process.env.MONDGO_USER}:${process.env.MONDGO_PASS}@cluster0.5iuh8.mongodb.net/${process.env.DATABASE}`)
  .then(() => console.log('DB connection successful! database - ' + process.env.DATABASE))
  .catch(err => {
    console.log(err.message);
  });

// 🔰 SERVER START
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

//FEATURE react-toastify, .env, reactleaflet cluster
//FIX restrict outside GEOrgia 41.1063, 43.5879 lat 40  46.73644)
//TODO performance issues
// i have react + node + mongo app of leaflet map, whin nearly 10000 markers on it, each marker icon has its document in "icons" table with image buffer. loading map is quite slow, what is pattern to display thousands of markers without mush delay?
//i have react + node + mongo app of leaflet map, i want to be able only add markers within predefined rectangle on map
