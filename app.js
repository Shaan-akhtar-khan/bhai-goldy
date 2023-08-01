const express = require("express");

const bodyParser= require("body-parser");

const https= require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true }));

app.get("/", function(req,res) 
{
    res.sendFile(__dirname + "/index.html"); 
}) ;


app.post("/",function(req,res){

    
    const query=req.body.CityName;
    const appID="b8ca778599d5ab593e774f439f2f90d1#";
    const units = "metric";
    const url= " https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units + "&appid=" + appID ;

    https.get(url,function(response){

        console.log(response.statusCode);

        
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const TempCelsius = weatherData.main.temp;
            res.write("<h1>the temperature in " + query + " is "+ TempCelsius + " celsius  </h1>") ;
            res.write("the country name is " + weatherData.sys.country );
            res.send();
        } );

    }); 

    });
    




app.listen(3000, function(){ console.log("server is running on port 3000"); } );