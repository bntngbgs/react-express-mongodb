const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const dbconn = require('./config/dbConn');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoute);

app.listen(8080, async () => {
  await dbconn.connectDB((error) => {
    if (error) console.log(error);
  });
  console.log('server running');
});
