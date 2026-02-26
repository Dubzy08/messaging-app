const express = require('express');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAdminAccount = require('./scripts/admin');
const io = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = server(io);


app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

io.on('connection', socket =>{
    console.log('New WS Connection...');
});

app.use('/user', signupRoute);
app.use('/auth', loginRoute);
app.use('/api', userRoute);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});