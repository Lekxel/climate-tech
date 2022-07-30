import { useEffect, useState } from "react";
import { create } from "screens/Weather/InterpolateHeatmapLayer";

interface Point {
  lat: number;
  lng: number;
  val: number;
}

const useFetchWeather = (longitude: number, latitude: number) => {
  const [weatherData, setWeatherData] = useState({
    temperature: {},
    humidity: {},
  });
  const [loaded, setLoaded] = useState(false);

  const processWeatherData = async () => {
    const startingLatitude = -80;
    const startingLongitude = -180;
    const endingLatitude = latitude;
    const endingLongitude = longitude;
    const n = 10;

    const points: Point[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        points.push({
          lat: startingLatitude + (i * (endingLatitude - startingLatitude)) / n,
          lng:
            startingLongitude + (j * (endingLongitude - startingLongitude)) / n,
          val: 0,
        });
      }
    }

    const weathers = await fetchWeather(points);

    let temperatureData = points.map((point, index) => ({
      ...point,
      val: JSON.parse(weathers[index]).main.temp,
    }));

    let humidityData = points.map((point, index) => ({
      ...point,
      val: JSON.parse(weathers[index]).main.humidity,
    }));

    setWeatherData({
      temperature: create({
        points: temperatureData,
        layerID: "temperature",
      }),
      humidity: create({
        points: humidityData,
        layerID: "humidity",
      }),
    });
    setLoaded(true);
  };

  useEffect(() => {
    processWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return { weatherData, loaded };
};

const fetchWeather = async (points: Point[]) => {
  const baseUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const urls = points.map(
    (point) => baseUrl + point.lat + "&lon=" + point.lng + "&appid=" + apiKey
  );

  // Fetch the weather data
  const weathers = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      return response.text();
    })
  );

  return weathers;
};

export default useFetchWeather;
