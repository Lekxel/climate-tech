import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import { logout } from "helpers/storage";
import useFetchWeather from "hooks/useFetchWeather";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Viewport {
  latitude: number;
  longitude: number;
}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const Weather: React.FC = () => {
  const mapContainer = useRef<any>();
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 0,
    longitude: 0,
  });
  const { weatherData, loaded } = useFetchWeather(
    viewport.longitude,
    viewport.latitude
  );

  const [showGeofence, setShowGeofence] = useState(true);

  const [activeWeather, setActiveWeather] = useState<
    "temperature" | "humidity"
  >("temperature");

  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
    // @ts-ignore
    mapboxgl: mapboxgl,
    marker: false,
  });

  geocoder.on("result", (e) => {
    if (e.result && e.result.center) {
      setViewport({
        longitude: e.result.center[0],
        latitude: e.result.center[1],
      });
    }
  });

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.longitude, viewport.latitude],
      zoom: 12,
      pitch: 60,
      bearing: 80,
    });

    if (loaded) {
      map.on("load", async () => {
        let layer = weatherData[activeWeather];
        // @ts-ignore
        map.addLayer(layer, "road-label");
        map.addControl(geocoder, "top-left");

        let _center = turf.point([viewport.longitude, viewport.latitude]);
        let _radius = 25;
        let _options = {
          steps: 80,
          units: "kilometers", // or "mile"
        };

        let _circle = turf.circle(_center, _radius, _options as any);

        if (showGeofence) {
          map.addSource("circleData", {
            type: "geojson",
            data: _circle,
          });

          map.addLayer({
            id: "circle-fill",
            type: "fill",
            source: "circleData",
            paint: {
              "fill-color": "blue",
              "fill-opacity": 0.4,
            },
          });
        }
      });
    }
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport, loaded, activeWeather, showGeofence]);

  const itemClassUtil = (item: any) => {
    return `px-5 py-2 border-b border-gray-200 text-sm leading-5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 ${
      item === activeWeather ? "bg-gray-100" : ""
    }`;
  };

  const toggleGeofence = () => {
    setShowGeofence(!showGeofence);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-between px-5">
        <h1>Use the search bar to find a location on the map</h1>
        <button onClick={logout}>Sign Out</button>
      </div>

      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

      <div className="absolute z-10 left-2 md:left-5 bottom-5">
        <button
          onClick={toggleGeofence}
          className={`text-xs px-5 py-2 border-b border-gray-200 leading-5  hover:text-gray-900 hover:bg-gray-100 focus:outline-none  ${
            showGeofence
              ? "bg-gray-100 text-gray-500"
              : "bg-gray-600 text-white"
          }`}
        >
          Toggle Geofence
        </button>
      </div>

      <div className="absolute z-10 right-2 md:right-5 bottom-5">
        <button
          onClick={() => setActiveWeather("temperature")}
          className={itemClassUtil("temperature")}
        >
          Temperature
        </button>
        <button
          onClick={() => setActiveWeather("humidity")}
          className={itemClassUtil("humidity")}
        >
          Humidity
        </button>
      </div>
    </div>
  );
};

export default Weather;
