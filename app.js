const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;
const path = require('path');
const mongoose  = require('mongoose');
const batchlist = require('./routes/batchlistr');
const Candidate = require('./routes/candidater');


// env config
// require('dotenv').config();

// importing database
// require('./config/db');

mongoose.connect('mongodb://localhost:27017/academy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("MongoDB Connected Successfully")})
.catch(err => {console.log(err)}) 


// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api', batchlist);
app.use('/api', Candidate);


app.get('/', (req, res) => {
    res.json({requestHeaders: req.headers, responseHeaders: res.getHeaders(), app: 'ty-academy', path: '/'});
});

app.use((err, req, res, next) => {
    res.json({error: true, message: err, errorMeassage: 'Some Internal Error Ocured'});
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

