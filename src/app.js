const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//defining path for express configuration
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath)) 

app.get('',(req,res) => {
    res.render('index',{
        title: 'weather',
        name: 'talha khalid'
    })
}) 

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Talha Khalid'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        name: 'Talha Khalid',
        title: 'help',
        message: 'This message is for your help'
    })
})


app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,data) => {
            if(error){
                return res.send({ error })
            }  
            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'Search term must be provided'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        name: 'Talha Khalid',
        title: '404',
        errorMessage: 'Help page not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        name: 'Talha Khalid',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})