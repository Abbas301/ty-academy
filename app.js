const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;

app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        request: req.headers,
        app: 'Medifit',
        path: '/'
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});