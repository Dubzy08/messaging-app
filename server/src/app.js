const express = require('express');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use('/user', signupRoute);
app.use('/auth', loginRoute);
app.use('/api', userRoute);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});