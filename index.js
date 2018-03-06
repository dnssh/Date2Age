'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());



restService.post('/age', function(req, res) {
   // var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.name ? req.body.result.parameters.name : "100"  *
//let firstName = req.body.result && req.body.result.parameters && req.body.result.parameters.firstname;

//var name=req.body.result && req.body.result.parameters && req.body.result.parameters.name;
   var date=req.body.result && req.body.result.parameters && req.body.result.parameters.date;
    
   var str=date;

/*  yyyy/mm/dd format*/
    var year = str.slice(0, 4);
    var month = str.slice(5, 7);
    var day = str.slice(8, 10);

    var dateString=year+"/"+month+"/"+day;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    { age--;}
    //document.getElementById("demo").innerHTML=age+" years";
    //res.render('index.html');

    return res.json({
        speech: "You are "+age+" years old",
        //speech:'<a href="https://google.com>Google</a>',
        displayText: 'Devansh',
        source: 'initial 99',
        data:{ "age": age}
        
    });

});


restService.post('/weather', function(req, res) {

    if (req.body.result.action === 'weather') {
    let city = req.body.result.parameters['geo-city'];
    let restUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID='+0c919df47b7fc6caa7eeb8161b2071ac+'&q='+city;

    request.get(restUrl, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        let json = JSON.parse(body);
        let msg = json.weather[0].description + ' and the temperature is ' + json.main.temp + ' ℉';
        return res.json({
          speech: msg,
          displayText: msg,
          source: 'weather'});
      } else {
        return res.status(400).json({
          status: {
            code: 400,
            errorType: 'I failed to look up the city name.'}});
      }})
  }


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});