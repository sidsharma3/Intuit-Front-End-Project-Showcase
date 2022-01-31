import React from 'react'
import ReactDOM from 'react-dom'
import WeatherInfo from '../WeatherInfo'
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer"

// Basic function used as prop for WeatherInfo
const onEnter = (event) => {
    if (event.key === 'Enter') {
        console.log("Enter key Pressed")
    }
}

let weatherDataForRealCity = {
    "status":200,
    "cityName":"Miami",
    "country":"US",
    "icon":"02d",
    "condition":"Clouds",
    "temp":"14.7"
}

let cityNotFoundWeatherData = {
    "status":404,
}

afterEach(cleanup)

it("WeatherInfo component rendered without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <WeatherInfo onEnter={onEnter} weatherData={weatherDataForRealCity}/>, div)
})

it("Matches WeatherInfo component Snapshot When City is Found", () => {
    const weatherInfo = renderer.create(
    <WeatherInfo onEnter={onEnter} weatherData={weatherDataForRealCity}/>).toJSON()
    expect(weatherInfo).toMatchSnapshot();
})

it("City Weather Data Found Text Rendered Correctly", () => {
    const { getByTestId } = render(
    <WeatherInfo onEnter={onEnter} weatherData={weatherDataForRealCity}/>)
    expect(getByTestId("cityAndCountryText")).toHaveTextContent("Miami, US")
})

it("Matches WeatherInfo component Snapshot When City is Not Found", () => {
    const weatherInfo = renderer.create(
    <WeatherInfo onEnter={onEnter} weatherData={cityNotFoundWeatherData}/>).toJSON()
    expect(weatherInfo).toMatchSnapshot();
})

it("City Weather Data Not Found Text Rendered Correctly", () => {
    const { getByTestId } = render(
    <WeatherInfo onEnter={onEnter} weatherData={cityNotFoundWeatherData}/>)
    expect(getByTestId("citynotFoundText"))
    .toHaveTextContent("Could Not Find Weather Data on City")
})