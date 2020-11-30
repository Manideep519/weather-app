const express = require('express')
const app = express()
const request = require('request');
const bodyParser = require('body-parser');
var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const apiKey = '91983b527b411f8743b8a2b0f1654e4f'
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
  request(url, (err, response, body) => {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  })
})

app.listen(port, () => {
  console.log("server running" + port)
})