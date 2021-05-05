const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const dir = './geojson';
const fileFormat = '.geojson'

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
let geoCollection
const openConnection = () => {
  client.connect(err => {
    geoCollection = client.db("AustralianAnimals").collection("GeoData");
    if (!err) {
      console.log('connected to the database');
    }

  })
}
app.use(express.static('public'))


//insert data if the admin password right
app.get('/insertData', function (req, res) {
  let password = encodeURI(req.query.password)
  var rightPassword = "dkjfkdgjeisngiegn"
  if(password == rightPassword){
    insertMany(res)
  }
  else{
    res.send("You do not have the authority to insert the data")
  }
  

})
app.get('/find', function(req, res){
  let name = encodeURI(req.query.name);
  findOneData(name, geoCollection,res)
 
})


const insertMany = (res) => {

  var fileNames = []
  var dataInsertToDatabase = []
  fileNames = init()
  fileNames.forEach(element => {
    var jsonFile = JSON.parse(fs.readFileSync(dir + '/' + element))
    var fileName = element.substring(0, element.indexOf("."))
    var payload = {
      name: fileName,
      data: jsonFile
    }

    dataInsertToDatabase.push(payload)
  });

  try {
    geoCollection.insertMany(dataInsertToDatabase)
    res.send("insert success")
  } catch (e) {
    console.log(e);
    
  }
}


function init() {
  return fs.readdirSync(dir)
    .filter(name => path.extname(name) === fileFormat)

}

const findOneData = async (animalName,collection,res)=>{
  var query = {name: animalName};

  var options = {
    // sort matched documents in descending order by rating
    sort: { rating: -1 },
    // Include only the `title` and `imdb` fields in the returned document
    projection: { _id: 1, name: 1 },
  };

  var result = await collection.findOne(query, options);
  console.log(result);
  res.send(result)

}



openConnection()

app.listen(PORT, () => {
  console.log('server started on port: ' + PORT)
})