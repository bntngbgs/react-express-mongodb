const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const dbconn = require('./config/dbConn');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoute);

app.listen(PORT, async () => {
  await dbconn.connectDB((error) => {
    if (error) console.log(error);
  });
  console.log('server running');
});
