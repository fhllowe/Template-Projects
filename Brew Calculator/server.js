const express = require ('express');
const bodyParser = require('body-parser');
const { calculateObjectSize } = require('bson');
const app = express();
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient
const connectionString = 'insert string here'


  
  
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    
    const db = client.db('morningbrew')
    const quotesCollection = db.collection('brewcalculator')
   

    //===========================
    // Middlewares
    //===========================
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(express.static('public'))

    //========================
    //Routes
    //========================

    app.get('/', async (req, res) => {
      const cursor = await quotesCollection.find().toArray({})
          res.render('index.ejs', {quotes: cursor})
       })
        //.catch(error => console.log('An error has occured')

    app.post('/brew', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
         console.log(result)
         console.log('Added to Database')
         res.redirect('/')
         })
         .catch(error => console.error(error))
     })
     
    app.put('/brew', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Test'},
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
        upsert: false
        }
      )
        .then (result => res.json('Success'))
        .catch(error => console.error(error))
      })
      
      app.delete('/brew', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if ( result.deletedCount === 0 ) {
              return res.json('INSUFFICIENT BREW')
              console.log('INSUFFICIENT BREW')
            }
            res.json(`Deleted This Brew`)
          })
          .catch(error => console.error(error ))
      })
      app.listen(PORT, function() {
            console.log('listening on 3000')
          })
  })
