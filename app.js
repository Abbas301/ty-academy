const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;

// env config
require('dotenv').config();

// importing database
require('./config/db');

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        requestHeaders: req.headers,
        responseHeaders: res.getHeaders(),
        app: 'Medifit',
        path: '/'
    });
});

app.use((err, req, res, next) => {
    res.json({
        message: 'Some Error Occurred'
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});