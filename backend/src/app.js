const express = require('express');
const signupRoute = require('./routes/signup');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

app.use('/user', signupRoute);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});