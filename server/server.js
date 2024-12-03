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
