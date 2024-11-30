const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const PORT = process.env.PORT || 8181;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v2', productRouter);

app.get('/', (req, res) => {
  res.send({ message: 'connected!' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

module.exports = app;
