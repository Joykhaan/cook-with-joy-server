

// new code from here
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://CookWithMe:s2J3a7o1fQuAKO2U@cluster0.wfqwiph.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userInfo = client.db('CookWithMe').collection('userInfo');
        const tutorials = client.db('CookWithMe').collection('Tutorials');
        const tutorial = client.db('CookWithMe').collection('Tutorial');
        


        app.get('/users', async (req, res) => {
            const query = {}
            const cursor = userInfo.find(query);
            const user = await cursor.toArray();
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const userinfo = req.body;
            const result = await userInfo.insertOne(userinfo);
            res.send(result)
        })
        
        app.get('/recipe-tutorials', async(req, res) => {
            // res.send(tutorials)
            const query = {}
            const cursor = tutorials.find(query);
            const tutorial = await cursor.toArray();
            res.send(tutorial);
        });
        app.post('/recipe-tutorials', async (req, res) => {
            const tutorials = req.body;
            const result = await tutorials.inserMany(tutorials);
            res.send(result)
        })
        app.get('/tutorial', async(req, res) => {
            // res.send(tutorial)
            const query = {}
            const cursor = tutorial.find(query);
            const tutorials = await cursor.toArray();
            res.send(tutorials);
        });
        app.get('/tutorial/:id', async(req, res) => {
            const id = req.params.id;
            const query ={_id: (id)}
            const cursor = tutorial.find(query);
            const tutorialsID = await cursor.toArray();
            console.log(tutorialsID)
            res.send(tutorialsID);
        });
        app.get('/sub-tutorial/:id', async(req, res) => {
            const id = req.params.id;
            const query ={id: (id)};
            const cursor = tutorial.find(query);
            const selectedSubTutorial = await cursor.toArray();
            res.send(selectedSubTutorial)
        });

        

    }
    finally {


    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('server running....')
});

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})