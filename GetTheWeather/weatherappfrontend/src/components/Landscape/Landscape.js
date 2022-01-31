import React, { useState, useEffect } from 'react';
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import "./Landscape.css"

// This component is in charge to the landscape shown on the
// application and also contains the WeatherInfo componenet
// which shows all the weather data
const Landscape = () => {

    const  [weatherData, setWeatherData] = useState();
    const [city, setCity] = useState(() => {
        // this function checks if a city was saved in the 
        // cache and if so sets it as the city to get the
        // weather data from, otherwise uses Miami as
        // the default city.
        const savedCity = localStorage.getItem("prevCity");
        if (savedCity){
            return savedCity
        }
        return "Miami";
    });

    useEffect( () => {
        // this function calls the open weather map API to collect
        // the weather data.
        const getWeatherData = async() => {
            const url = `${process.env.REACT_APP_API_URL}/${city}`
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log("green")
            console.log(jsonData)
            localStorage.setItem("prevCity", city);
            setWeatherData(jsonData);
        } 
        getWeatherData();
    },[city] )

    // this functions sets the search value which invokes
    // getWeatherData function
    const onEnter = (event) => {
        // If enter is hit what ever text was in the text
        // box will be set as the city and used to get the weather data.
        if (event.key === 'Enter') {
            setCity(event.target.value)
        }
    }
    
    return(
        <div className="landscape">
            <WeatherInfo onEnter={onEnter} weatherData={weatherData}/>
            <div className="land" 
                style={{ backgroundColor: 
                (weatherData != null && weatherData["status"] === 200 && 
                (weatherData["temp"] <= 0.0))
                ? "white" : "green"}} 
            />
            <div className="sun"/>
        </div>
    )
}

export default Landscape;