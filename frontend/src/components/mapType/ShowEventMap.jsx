/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";

const { BaseLayer } = LayersControl;

// Custom marker icon (Red marker)
const eventIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/order-delivered.png",
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

// Change View Component
const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(coords, 8, { animate: true, duration: 1.5 });
    }, [coords, map]);
    return null;
};

// Locate Me Button
const LocateButton = ({ setSelectedLocation }) => {
    const map = useMap();

    const handleLocateMe = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    map.flyTo(userCoords, 16, { animate: true, duration: 1.5 });
                    if (typeof setSelectedLocation === "function") {
                        setSelectedLocation(userCoords);
                    }
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

const ShowEventMap = ({ setSelectedLocation, categoryType, filterDate, specialCategoryName }) => {
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]); // Default location: Sri Lanka

    const [filteredCategory, setFilteredCategory] = useState("");
    //console.log("Filter category name ",filteredCategory);

    const dispatch = useDispatch();
    const { events, status, error } = useSelector((state) => state.events);
    useEffect(() => {
        dispatch(fetchSpecialCategory());
    }, [dispatch]);

    // console.log(filterDate);

    useEffect(() => {
        setFilteredCategory(categoryType);
    }, [categoryType, filterDate,]);


    // Get User Location
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



    const categoryIcons = {
        entertainment: markerIcons.green,
        volunteer: markerIcons.yellow,
        traditional: markerIcons.blue,
    };

    return (
        <div className="relative h-full w-full">
            <MapContainer center={userLocation} zoom={8} className="h-full w-full rounded-xl relative">
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

                {/* 📌 Show Event Markers */}
                {
                    events.filter(event => {

                        // console.log(events);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const eventDate = new Date(event.date);
                        eventDate.setHours(0, 0, 0, 0);

                        const isUpcoming = eventDate >= today;

                        const isCategoryMatch = !filteredCategory || event.category === filteredCategory || (filteredCategory === specialCategoryName && event.category === specialCategoryName);

                        const isDateMatch = filterDate && eventDate.toDateString() === new Date(filterDate).toDateString();


                        if (filterDate) {
                            return isDateMatch;
                        }

                        else {
                            return isUpcoming && isCategoryMatch || (filteredCategory === specialCategoryName && event.category === specialCategoryName);
                        }
                    })


                        .map(event => (
                            <Marker
                                key={event._id}
                                position={[event.location.coordinates[1], event.location.coordinates[0]]}
                                icon={categoryIcons[event.category] || markerIcons.violet}
                            >
                                <Popup>
                                    <div className="w-48 p-2 bg-white rounded-md shadow-md">
                                        <h3 className="font-bold text-sm text-gray-800">{event.title}</h3>

                                        {/* Scrollable Description */}
                                        <div className="max-h-16 overflow-y-auto text-gray-600 text-xs mt-1">
                                            {event.description}
                                        </div>

                                        <div className="mt-1 text-xs">
                                            <p><span className="font-semibold text-gray-700">Category:</span> {event.category}</p>
                                            <p><span className="font-semibold text-gray-700">Date:</span>
                                                {new Date(event.date).toISOString().split('T')[0]}
                                            </p>
                                        </div>

                                        {event.imageUrl && (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-16 mt-1 rounded object-cover"
                                            />
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}



                {/* 📌 Always Show User's Location Marker */}
                {userLocation && <Marker position={userLocation} icon={eventIcon} />}

                {/* 📌 "Locate Me" Button */}
                <LocateButton setSelectedLocation={setSelectedLocation} />
            </MapContainer>
        </div>
    );
};

export default ShowEventMap;
