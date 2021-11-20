const express = require('express');
const mongoose = require('mongoose')
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedHelpers')
const cities = require('./cities')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Connected to MongoDB')
})

const sample =  arr => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            title: `${sample(places)} ${sample(descriptors)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price: `${Math.floor(Math.random() * 30) + 1}`,
            image: 'https://source.unsplash.com/collection/190727/',
            description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. `
        })
        await camp.save()
    }
}

seedDB().then(() => { 
    mongoose.connection.close()
})