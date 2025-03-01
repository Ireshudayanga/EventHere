/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCrosshairs } from "react-icons/fa";
import locationIcon from '../../assets/images/location.png';

const { BaseLayer } = LayersControl;

// Custom marker icon (Red marker)
const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [39, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

const markerIcons = {
    red: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    blue: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    green: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    yellow: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    black: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    white: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-white.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    violet: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    orange: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
    grey: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    }),
};


// 📌 ChangeView Component (Fly to new location)
const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(coords, 15, { animate: true, duration: 1.5 });
    }, [coords, map]);
    return null;
};

// 📌 User Click Handler (Selects Location)
const LocationMarker = ({ setSelectedLocation, clickable = true, type }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    useMapEvents({
        click(e) {
            if (!clickable) return; // Prevent adding marker if not clickable

            const { lat, lng } = e.latlng;
            setMarkerPosition([lat, lng]); // Update marker position
            if (typeof setSelectedLocation === "function") {
                setSelectedLocation([lat, lng]); // Send location to AddEvent.js
            }
            console.log("Selected Location:", lat, lng);
        },
    });

    return markerPosition ? <Marker position={markerPosition} icon={markerIcons[type] || markerIcons.black} /> : null;
};




{/* 📌 "Locate Me" Button (INSIDE the Map) */ }
const LocateButton = ({ setSelectedLocation }) => {
    const map = useMap();

    const handleLocateMe = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    map.flyTo(userCoords, 15, { animate: true, duration: 1.5 });
                    if (typeof setSelectedLocation === "function") {
                        setSelectedLocation(userCoords);
                    }
                    console.log("Located at:", userCoords);
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                },
                { enableHighAccuracy: true }
            );
        }
    };

    return (
        <button
            onClick={handleLocateMe}
            className="absolute bottom-4 right-4 bg-white p-3 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 transition-all z-[1000]"
        >
            <FaCrosshairs className="h-6 w-6 text-gray-700" />
        </button>
    );
};

const Map = ({ setSelectedLocation, clickable = true, setPickup, setDropoff, activeField }) => {
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]); // Default: Sri Lanka

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(newLocation);
                    if (typeof setSelectedLocation === "function") {
                        setSelectedLocation(newLocation);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    return (
        <div className="relative h-full w-full">
            <MapContainer center={userLocation} zoom={10} className="h-full w-full rounded-xl relative">
                <ChangeView coords={userLocation} />

                {/* Base Map Layers */}
                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>
                </LayersControl>

                {/* 📌 Always Show User's Location Marker */}
                {userLocation && <Marker position={userLocation} icon={customIcon} />}

                {/* Clickable Location Marker (Only if clickable is true) */}
                <LocationMarker setSelectedLocation={setSelectedLocation} clickable={clickable} />

                {/* 📌 "Locate Me" Button (INSIDE the Map) */}
                <LocateButton setSelectedLocation={setSelectedLocation} />

                {activeField === "pickup" && (
                    <LocationMarker
                        setSelectedLocation={setPickup} // Pass setPickup as setSelectedLocation
                        clickable={true}
                        type="blue"
                    />
                )}
                {activeField === "event" && (
                    <LocationMarker
                        setSelectedLocation={setDropoff} // Pass setDropoff as setSelectedLocation
                        clickable={true}
                        type="green"
                    />
                )}
            </MapContainer>
        </div>
    );
};


export default Map;
