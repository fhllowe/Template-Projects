
const express = require ('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();
console.log(process.env);
const PORT = 3000;

let db,
  connectionString = process.env.DB_STRING
  dbName = 'morningbrew';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    
    db = client.db(dbName)
   brewCollection = db.collection('brewcalculator')
  })


    //===========================
    // Middlewares
    //===========================
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    
    app.use(express.static('public'))

    //========================
    //Routes
    //========================

    //app.get('/', async (req, res) => {
      //const cursor = await brewCollection.find().toArray({})
      //    res.render('index.ejs', {brewCollection: cursor})
      // })
        //.catch(error => console.log('An error has occured'))

    app.get('/', (request, response) => {
      brewCollection.find().sort({_id: -1}).toArray({})
      .then(data => {
        response.render('index.ejs', {brewCollection: data})
      })
      .catch(error => console.error(error))
    })

    app.post('/addBrew', (req, res) => {
      brewCollection.insertOne({
        country : req.body.country, 
        region : req.body.region,
        estate : req.body.estate,
        varietal : req.body.varietal,
        groundWeight : req.body.groundWeight,
        ratio : req.body.ratio,
        printBrew : req.body.groundWeight * req.body.ratio})
        .then(result => {
         console.log(`Added to ${dbName} Database`)
         res.redirect('/')
         })
         .catch(error => console.error(error))
     })
     
app.put('/calculateBrew', (request, response) => {
  brewCollection.updateOne(
    { groundWeight: request.body.groundWeight, ratio: request.body.ratio, },
      {
      $push: {
        bloom : groundWeight * 2,
        waterWeight: waterWeight,
        
        printBrew: `Start with ${groundWeight}g ground to medium, heat up water to 93C, pour ${bloom}g of water into the grounds, wait for 30 seconds, add another $ and pour to ${waterWeight}g`,
        }
      },
      {
        upsert: true
      }
    )
        .then (
          result => {response.json('Success')
        })
        .catch(error => console.error(error))
  })
      
   ///   app.delete('/deleteBrew', (request, response) => {
   ///     brewCollection.deleteOne(
   ///       { country: req.body.country }
   //     )
   //       .then(result => {
  //          console.log('Brew Deleted')
  //          reponse.json(`Brew Deleted`)
  //        })
  //        .catch(error => console.error(error ))
  //    })


      app.listen(process.env.PORT || PORT, () => {
            console.log(`listening on PORT ${PORT}`)
      })


      app.delete('/deleteBrew', (request, response) => {
        brewCollection.deleteOne({
          countryOrigin : request.body.countryS, 
          regionOrigin : request.body.regionS,
          estateMicrolot : request.body.estateS,
          varietalType : request.body.varietalS,
          coffeeWeight : request.body.groundWeightS,
          coffeeRatio : request.body.ratioS,
          waterWeight : request.body.printBrewS})
        .then(result => {
            console.log('Brew Deleted')
            response.json('Brew Deleted')
        })
        //.catch(error => console.error(error))
    
    })
