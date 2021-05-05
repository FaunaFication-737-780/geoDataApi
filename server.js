const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express()
const PORT = 3000
//mongodb uri
//const uri = "mongodb+srv://ray:1998@cluster0.ho33k.mongodb.net/Sitboard?retryWrites=true&w=majority";
const uri = "mongodb://ray:1998@cluster0-shard-00-00.ho33k.mongodb.net:27017,cluster0-shard-00-01.ho33k.mongodb.net:27017,cluster0-shard-00-02.ho33k.mongodb.net:27017/test?ssl=true&replicaSet=atlas-k8w5gq-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

//connect to the database
let journalsCollection
const openConnection = () => {
  client.connect(err => {
    journalsCollection = client.db("test").collection("testGeo");
    if (!err) {
      console.log('connected to the database');
    }

  })
}
app.use(express.static('public'))


app.get('', function(req, res){
    

})

openConnection()

app.listen(PORT,()=>{
    console.log('server started on port: ' + PORT)
})