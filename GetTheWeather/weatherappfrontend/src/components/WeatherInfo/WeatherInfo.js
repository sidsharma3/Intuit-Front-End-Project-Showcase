import React from 'react';
import "./WeatherInfo.css"

// This componenet is responsible for displaying the weather data
// for the given city and contains the form which is used to select a new city.
const WeatherInfo = ({onEnter, weatherData}) => {
    return (
        <div className="weatherDataBox">

                <div className="cityInputBox">
                    <input 
                    type="text" 
                    placeholder="Type a City Here and Press Enter to get the Weather!"
                    onKeyDown={onEnter}
                    />
                </div>

                {   
                    (weatherData != null && weatherData["status"] === 200)
                    ? 
                    <div className="weatherData">
                        <h2 data-testid="cityAndCountryText" className="location">
                            {`${weatherData["cityName"]}, ${weatherData["country"]}`}
                        </h2>
                        <img 
                            className="weatherIcon"
                            src={`${process.env.REACT_APP_IMG_URL}/${weatherData["icon"]}@2x.png`}
                            alt="Weather Condition Icon"
                        />
                        <h1 className="textInfo">
                            {weatherData["condition"]}
                        </h1>
                        <h1 className="textInfo">
                            {`Current Temp: ${weatherData["temp"]}°C`}
                        </h1>
                    </div>
                    : <h1 data-testid="citynotFoundText" > Could Not Find Weather Data on City </h1> 
                }

        </div>
    )
}


export default WeatherInfo;