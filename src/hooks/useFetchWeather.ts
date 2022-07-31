import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface Point {
  lat: number;
  lng: number;
  val: number;
}

const useFetchWeather = (longitude: number, latitude: number) => {
  const [Geo, setGeo] = useState<any>({});

  const [loaded, setLoaded] = useState(false);

  const processWeatherData = async () => {
    const startingLatitude = latitude - 20;
    const startingLongitude = longitude - 20;
    const endingLatitude = latitude + 20;
    const endingLongitude = longitude + 20;
    const n = endingLatitude - startingLatitude;

    const points: Point[] = [];

    for (let i = 0; i < n; i++) {
      points.push({
        lat: startingLatitude + i,
        lng: startingLongitude + i,
        val: 0,
      });
    }

    let geoJSON: any = {
      type: "FeatureCollection",
      features: [],
    };

    const weathers = await fetchWeather(points);

    for (let i = 0; i < weathers.length; i++) {
      const weather = JSON.parse(weathers[i]);
      const point = points[i];
      point.val = weather.main.temp;
      let coord = mapboxgl.MercatorCoordinate.fromLngLat(
        { lng: point.lng, lat: point.lat },
        0
      );
      geoJSON.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [coord.x, coord.y, coord.z],
        },
        properties: {
          temperature: weather.main.temp,
          humidity: weather.main.humidity,
        },
      });
    }

    setGeo(geoJSON);
    setLoaded(true);
  };

  useEffect(() => {
    processWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return { Geo, loaded };
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
