const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');
require('dotenv').config();


//cNu3qFlwOaCn7XFI

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const customersCollection = client.db("snsInternet").collection("customers");
        const billsCollection = client.db("snsInternet").collection("bills");

        // Show / Read Customers Start
        app.get('/customers', async (req, res) => {
            const query = {};
            const customers = await customersCollection.find(query).toArray();
            res.send(customers);
        })
        // Show / Read Customers End


        // Add Customer Start
        app.post('/customers', async (req, res) => {
            const customer = req.body;
            const result = await customersCollection.insertOne(customer);
            res.send(result);
        })
        // Add Customer End

        // Update the Customer Start
        app.put('/customers/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const customer = req.body;
            const option = { upsert: true };
            const updatedCustomer = {
                $set: {
                    name: customer.name,
                    ip:customer.ip,
                    mobile:customer.mobile,
                    address:customer.address,
                    mb:customer.mb,
                    price:customer.price,
                    connection_date:customer.connection_date
                }
            }
            const result = await customersCollection.updateOne(filter, updatedCustomer, option);
            res.send(result);
            console.log(result);
        });
        // Update the Customer End

        // Show / Read Bills Start
        app.get('/bills', async (req, res) => {
            const query = {};
            const bills = await billsCollection.find(query).toArray();
            res.send(bills);
        })
        // Show / Read Bills End

        // Add Bills Start
        app.post('/bills', async (req, res) => {
            const bill = req.body;
            const result = await billsCollection.insertOne(bill);
            res.send(result);
        })
        // Add Bills End





    }
    finally {

    }

}
run().catch(error => console.error(error));



app.get('/', async (req, res) => {
    res.send('SNS Internet Server is running..');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});