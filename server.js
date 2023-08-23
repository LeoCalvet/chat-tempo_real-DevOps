var express = require('express');
const { use } = require('express/lib/application');

var app = express();

var server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
 });

app.use(express.static(__dirname))
