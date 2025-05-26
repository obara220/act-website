import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "500px",
};

// Default center (can be updated via props)
const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const car = {
  url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  scaledSize: { width: 40, height: 40 },
};

function GoogleMapComponent({ driverLocation = defaultCenter }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxmNyc2scn1nCxBl4_-dxzVzNfpX86YcU",
  });

  const [map, setMap] = React.useState(null);
  const [currentLocation, setCurrentLocation] = useState(driverLocation);

  // Update location when driverLocation prop changes
  useEffect(() => {
    setCurrentLocation(driverLocation);
  }, [driverLocation]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);
    setMap(map);
  }, [currentLocation]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Function to simulate location updates (for testing)
  const simulateLocationUpdate = () => {
    const newLocation = {
      lat: currentLocation.lat + (Math.random() - 0.5) * 0.01,
      lng: currentLocation.lng + (Math.random() - 0.5) * 0.01,
    };
    setCurrentLocation(newLocation);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        id="traffic-example"
      >
        <Marker position={currentLocation} icon={car} />
      </GoogleMap>
      {/* Test button - remove in production */}
      <button 
        onClick={simulateLocationUpdate}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#0A7AFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Simulate Location Update
      </button>
    </div>
  ) : (
    <div>Loading map...</div>
  );
}

export default React.memo(GoogleMapComponent);
