const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

// giselem Hm5D6A1iFs33zrtF
let db
MongoClient.connect('mongodb+srv://giselem:Hm5D6A1iFs33zrtF@learningcluster-vkfrp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.error(err)
  //db = database
  app.listen(8000, function() {
    console.log('Está ouvindo na porta 8000!')
  })
})

// set the view engine to ejs
app.set('view engine', 'ejs')

// True to allow nested objects
app.use(bodyParser.urlencoded({ extended: true }))

// GET (READ) OPERATION :

/* The first argument = path of the GET request, anything that comes after
the domain name.
  When we're visinting our own port (8000), our browser is looking for
localhost:8000. The path argument in this case is '/'
  The second argument = callback function that tells the server what to do
  when the path is matched. The callback takes two arguments:
    1) A request object
    2) A response object
*/

app.get('/', (req, res) => {
  let learningDB = db.db('learningcluster')
  learningDB.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { quotes: result })
  })
})

// POST (CREATE) OPERATION :

/*  We can handle a POST request with a post method that Express provides.
  It takes the same arguments as the GET method.
  PS.: Express doesn't handle reading data from the form element on its own,
  for that we need the package body-parser.
*/

app.post('/quotes', (req, res, database) => {
  let learningDB = db.db('learningcluster')
  learningDB.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.error(err)
    console.log('Saved to database!')
    res.redirect('/')
  })
})
