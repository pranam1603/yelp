const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

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

app.get('/makeCamp', async(req, res) => { 
    const camp = new Campground({ title: 'My Backyard', description: 'This is a huge backyard', price: 10, location: 'New York' })
    await camp.save()
    res.send(camp)
})


app.listen(3000, () => {
  console.log('listening on 3000')
})