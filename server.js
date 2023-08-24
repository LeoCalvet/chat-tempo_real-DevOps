const mongoose = require('mongoose');
const urlBD = 'mongodb+srv://leonardo-calvet:1234@avtmaior-cluster.ikyqnfn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(urlBD)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

var Message = mongoose.model('Message',{ name : String, message : String})

var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

var server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
 });

app.use(express.static(__dirname));

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})
