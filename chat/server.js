const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.get('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket Conectado: ${socket.id}`);

    // Send historical messages to the newly connected client
    socket.emit('previousMessage', messages);

    socket.on('sendMessage', data => {
        if (!data || typeof data.author !== 'string' || typeof data.message !== 'string') {
            return;
        }
        const cleanData = {
            author: data.author.trim(),
            message: data.message.trim()
        };
        if (cleanData.author && cleanData.message) {
            messages.push(cleanData);
            socket.broadcast.emit('receivedMessage', cleanData);
            console.log(cleanData);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Chat server running on port ${PORT}`);
});