const app = require('express')();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}
//const PORT = 8080;

// Setting up and using cors is required in order
// to get requests form this REST API.
app.use(cors(corsOptions))

// This line starts the server 
app.listen(
    process.env.PORT,
    () => console.log('Server is live!')
);

app.get('/:city', (req, res) => {
    // set up response object
    weatherData = {}
    // get data from open weather map api
    axios.get(`${process.env.API_URL}?q=${req.params["city"]}&appid=${process.env.API_KEY}`)
    .then(response => {
        // update response object
        weatherData["status"] = response.data["cod"]
        weatherData["cityName"] = response.data.name
        weatherData["country"] = response.data.sys.country
        weatherData["icon"] = response.data.weather[0]["icon"]
        weatherData["condition"] = response.data.weather[0]["main"]
        weatherData["temp"] = (response.data.main["temp"]  - 273.15).toFixed(1)
        // send response object
        res.status(200).send(weatherData)
    })
    .catch(error => {
        // note error and send object noting status
        console.log(error);
        res.status(404).send({"status" : 404})
    });
});