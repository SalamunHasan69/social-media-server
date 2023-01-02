const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3kn3bwn.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
    const mediaCollection = client.db('CoolTube').collection('MediaCollection');
    console.log(mediaCollection);

    app.post('/media', async (req, res) => {
      const media = req.body;
      const result = await mediaCollection.insertOne(media);
      res.send(result);
    });

    app.get('/media', async (req, res) => {
      const query = {};
      const media = await mediaCollection.find(query).toArray();
      res.send(media);
    })

  }

  finally {

  }

};

run().catch(console.log);

app.get('/', async (req, res) => {
  res.send('Social media server is running')
});

app.listen(port, () => console.log(`Social media running on ${port}`));