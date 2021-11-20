const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

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

app.engine('ejs', ejsMate)

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => { 
    res.render('home');
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campground/index', { campgrounds })
})

app.get('/campground/:id', async(req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
    res.render('campground/show', {camp})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campground/new');
})

app.get('/campgrounds/edit/:id', async(req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
    res.render('campground/edit', {camp})
    // res.send(camp)
})

app.post('/campgrounds', async(req, res) => {
    const campData = req.body
    const newCamp = new Campground(campData)
    await newCamp.save()
    res.redirect('/campgrounds')
})

app.put('/campgrounds/edit/:id', async(req, res) => {
    const {id} = req.params
    await Campground.findByIdAndUpdate(id, req.body)
    res.redirect(`/campground/${id}`)
})

app.delete('/campground/delete/:id', async(req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
  console.log('listening on 3000')
})