require('./config/config')
require('./models/db')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const rtsIndex = require('./routers/Auth')


var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsIndex)

app.listen(process.env.PORT,()=>{
    console.log(`Server is Started at port :${process.env.PORT}`);
})

