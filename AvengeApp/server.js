const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// 'mongodb+srv://shree:viratkohli@cluster0.fxw5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect('mongodb+srv://shree:viratkohli@cluster0.fxw5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate({ name: 'Tony Stark' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      })
      .then(result => {
        res.json('Success')
       })
      .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
          quotesCollection.deleteOne(
            { name: req.body.name }
          )
            .then(result => {
              if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }
              res.json(`Deleted Darth Vadar's quote`)
            })
            .catch(error => console.error(error))
        })
    // app.set('view engine', 'ejs')
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
        })
   
    app.listen(3000, function() {
    console.log('listening on 3000')
      })
    
    
      
  
    
    
          // .catch(error => console.error(error))
   
      

    }) 