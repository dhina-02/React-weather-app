import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const [location, setLocation] = useState("delhi");
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [wicon, setWicon] = useState(clear_icon);
  const api_key = "b87fe8a3c3630cfa735acba688a07ce0";

  useEffect(() => {
    async function fetchData() {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      let response = await fetch(URL);

      if (response.ok) {
        setData(await response.json());
      } else {
        console.log("error");
      }
    }
    fetchData();
  }, [update]); // Include location in dependencies to fetch data when location changes

  useEffect(() => {
    if (data && data.weather && data.weather.length > 0) {
      const iconCode = data.weather[0].icon;

      if (iconCode === "01d" || iconCode === "01n") {
        setWicon(clear_icon);
      } else if (iconCode === "02d" || iconCode === "02n") {
        setWicon(cloud_icon);
      } else if (
        iconCode === "03d" ||
        iconCode === "03n" ||
        iconCode === "04d" ||
        iconCode === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        iconCode === "09d" ||
        iconCode === "09n" ||
        iconCode === "10d" ||
        iconCode === "10n"
      ) {
        setWicon(rain_icon);
      } else if (iconCode === "13d" || iconCode === "13n") {
        setWicon(snow_icon);
      }
    }
  }, [data]);

  const updateValue = () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search"
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="search-icon">
          <img src={search_icon} alt="search_icon" onClick={updateValue} />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        {data ? `${data.main.humidity}°c` : ""}
      </div>
      <div className="weather-location">{data ? data.name : ""}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              {data ? `${Math.floor(data.main.temp)}%` : ""}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              {data ? `${Math.floor(data.wind.speed)}km/h` : ""}
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
