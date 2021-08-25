const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;
const auth = require('./routes/authr')
const lifestyle = require('./routes/lifestyler')
const exercise = require('./routes/exerciseListr')
const demographic = require('./routes/demographicsr')
const medical = require('./routes/medical-route')
const recipe = require('./routes/reciper')
const path = require('path');

// const swaggerJSDoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// env config
require('dotenv').config();

// importing database
require('./config/db');

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join('public/images')));
app.use(express.static(path.join('public/recipies')));
app.use(express.static(path.join('public/excelFile')));
app.use(express.json());


app.use('/api', auth)
app.use('/api', lifestyle)
app.use('/api', demographic);
app.use('/api', recipe);
app.use('/api/medical', medical)

app.use('/api',exercise)

// const option = {
//     definition :{
//         openapi :'3.0.0',
//         info :{
//             title:'MediFit App',
//             version:'1.0.0'
//         } ,
//         servers:[
//             {
//              url:'http://localhost:2000/api'
//             }
//         ]
//     },
//     apis:['./app.js']
//    }
// const swaggerSpec = swaggerJSDoc(option)
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({requestHeaders: req.headers, responseHeaders: res.getHeaders(), app: 'Medifit', path: '/'});
});

app.use((err, req, res, next) => {
    res.json({error: true, message: err, errorMeassage: 'Some Internal Error Ocured'});
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
