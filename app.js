const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to MongoDB')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => { 
    res.render('home');
})


app.listen(3000, () => {
  console.log('listening on 3000')
})