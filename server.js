const mongoose = require('mongoose');
const urlBD = 'mongodb+srv://leonardo-calvet:1234@avtmaior-cluster.ikyqnfn.mongodb.net/?retryWrites=true&w=majority';
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
      Message.create(msg).then(() => {  // Salvando mensagem no banco de dados
          io.emit('chat message', msg);  // Enviando a mensagem para todos os clientes conectados
      });
  });
});

http.listen(3000, () => {
  console.log('server is running on port 3000');
});

