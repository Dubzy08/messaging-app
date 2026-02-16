const express = require('express');
const signupRoute = require('./routes/signup');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAdminAccount = require('./scripts/admin');
const loginRoute = require('./routes/login');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use('/user', signupRoute);
app.use('/auth', loginRoute)

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});