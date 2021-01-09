const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

res.sendFile(__dirname + "/index.html");

  // res.send("Server is running by express")
})

app.post("/", function(req,res){
  // console.log("Post request received");

  const query = req.body.cityName;
  const apiKey = "1b5d79db92c907816e033d50d0bbcde0";
  const unit = "metric"
  const  url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + apiKey;
    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp ;
        const description = weatherData.weather[0].description
        const feels_like = weatherData.main.feels_like
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
        res.write("<h1>The current temp in " + query +" is: " + temp +"<br>" + "The description: " + description +"<br>" + "Feels like temperature: " + feels_like +"&#8451;"+"</h1>" );
        res.write("<img src=" + imageURL + ">");
        res.write("<p> &copy; The Official Piyush Gupta</p>")
        res.send();
      })
    })
})



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running");
})
