const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{

        const customersCollection = client.db("snsInternet").collection("customers");

        






    }
    finally{

    }

}
run().catch(error => console.error(error));



app.get('/', async (req, res)=>{
    res.send('SNS Internet Server is running..');
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});