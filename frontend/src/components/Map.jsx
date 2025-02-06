/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

// Custom marker icon (Red marker)
const customIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// Component to update the map view dynamically
const ChangeView = ({ coords }) => {
    const map = useMap();
    map.flyTo(coords, 15, { animate: true, duration: 1.5 });
    return null;
};

// "Locate Me" Button (INSIDE the Map)
const LocateButton = ({ userLocation }) => {
    const map = useMap();

    const handleLocateMe = () => {
        if (map) {
            map.flyTo(userLocation, 15, { animate: true, duration: 1.5 });
        }
    };

    return (
        <button
            onClick={handleLocateMe}
            className="absolute bottom-4 right-4 bg-white p-3 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 transition-all z-[1000]"
        >
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Locate Me" className="h-6 w-6" />
        </button>
    );
};

const Map = () => {
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]); // Default location (Sri Lanka)
    const markerRef = useRef(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(newLocation);

                    if (markerRef.current) {
                        markerRef.current.setLatLng(newLocation);
                    }

                    console.log("Updated Location:", newLocation);
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    return (
        <div className="relative h-full w-full">
            <MapContainer center={userLocation} zoom={15} className="h-full w-full rounded-xl relative">
                <ChangeView coords={userLocation} />

                {/* Layer Control for Multiple Maps */}
                <LayersControl position="topright">
                    {/* Base Map Layers */}
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>

                    <BaseLayer name="Satellite">
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            attribution="© Google Maps"
                        />
                    </BaseLayer>

                    <BaseLayer name="Terrain">
                        <TileLayer
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                            attribution="© OpenTopoMap"
                        />
                    </BaseLayer>

                    {/* Overlay Layers */}
                    <Overlay checked name="My Location">
                        <Marker position={userLocation} icon={customIcon} ref={markerRef}></Marker>
                    </Overlay>

                    <Overlay name="Custom Polygon">
                        <Polygon positions={[[7.87, 80.77], [7.90, 80.80], [7.85, 80.75]]} color="blue" />
                    </Overlay>
                </LayersControl>

                {/* "Locate Me" Button INSIDE the map */}
                <LocateButton userLocation={userLocation} />
            </MapContainer>
        </div>
    );
};

export default Map;
