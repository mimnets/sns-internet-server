const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express());

app.get('/', async (req, res)=>{
    res.send('SNS Internet Server is running..');
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});