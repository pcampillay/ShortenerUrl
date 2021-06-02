const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/shortener';

const dbConf = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, dbConf).then(
  () => { console.log('Connected to Database'); },
  err => { console.log('ERROR: connecting to Database. ' + err); }
);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const shortener = require("./routes/shortener");
app.use("/", shortener);

app.listen(3003, function () {
  console.log('express shortener url listening to port 3003');
});