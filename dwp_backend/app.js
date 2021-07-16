const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require("morgan");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./server/routes')(app);

app.listen(3210, ()=>{
  console.log('Server @port 3210!');
});

module.exports = app;
