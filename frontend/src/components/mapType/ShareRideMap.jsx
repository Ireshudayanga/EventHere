/* eslint-disable react/prop-types */
// ShareRideMap.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCrosshairs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import Button from "../Button";
import { Polyline } from "react-leaflet";
import polyline from "polyline";

const { BaseLayer } = LayersControl;

// Custom marker icon for the user's location
const eventIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/order-delivered.png",
    iconSize: [39, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// Other marker icons
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
// Component to update the map view when the location changes
const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(coords, 8, { animate: true, duration: 1.5 });
    }, [coords, map]);
    return null;
};

// "Locate Me" Button (updates pickup location)
const LocateButton = ({ onPickupSelect }) => {
    const map = useMap();

    const handleLocateMe = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    map.flyTo(userCoords, 16, { animate: true, duration: 1.5 });
                    if (typeof onPickupSelect === "function") {
                        onPickupSelect(`${userCoords[0].toFixed(4)}, ${userCoords[1].toFixed(4)}`);
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

// Component that listens for map clicks to select a pickup point
const MapClickHandler = ({ onPickupSelect, activeField }) => {
    const [pickupPosition, setPickupPosition] = useState(null);

    useMapEvent("click", (e) => {
        if (activeField === "pickup") {
            const { lat, lng } = e.latlng;
            const newPosition = [lat, lng];
            setPickupPosition(newPosition);
            if (typeof onPickupSelect === "function") {
                onPickupSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
        }
    });

    return pickupPosition ? <Marker position={pickupPosition} icon={markerIcons.grey} /> : null;
};

const ShareRideMap = ({
    onDropSelect,
    onPickupSelect,
    activeField,
    setSelectedLocation,
    categoryType,
    filterDate,
    specialCategoryName,
    pickupLocation, // new prop from parent
    dropLocation,   // new prop from parent
}) => {
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]); // Default location
    const [filteredCategory, setFilteredCategory] = useState("");
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const [routeCoords, setRouteCoords] = useState(null);
    // Add this state along with your other state variables
    const [routeDistance, setRouteDistance] = useState(null);

    console.log("Route Distance:", routeDistance);

    useEffect(() => {
        const calculateRoute = async () => {
            if (pickupLocation && dropLocation) {
                try {
                    // Parse coordinates from strings
                    const [startLat, startLng] = pickupLocation.split(',').map(Number);
                    const [endLat, endLng] = dropLocation.split(',').map(Number);

                    // Fetch route from OSRM API
                    const response = await fetch(
                        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
                    );

                    const data = await response.json();

                    if (data.routes?.[0]?.geometry) {
                        // Convert GeoJSON coordinates to Leaflet's [lat, lng] format
                        const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                        setRouteCoords(coords);

                        // Set the route distance (in meters)
                        setRouteDistance(data.routes[0].distance);
                    }
                } catch (error) {
                    console.error("Error fetching route:", error);
                }
            } else {
                setRouteCoords(null);
                setRouteDistance(null);
            }
        };

        calculateRoute();
    }, [pickupLocation, dropLocation]);


    useEffect(() => {
        dispatch(fetchSpecialCategory());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCategory(categoryType);
    }, [categoryType, filterDate]);

    // Get user's location on mount
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
    }, [onPickupSelect, setSelectedLocation]);

    // Define category icons mapping (customize as needed)
    const categoryIcons = {
        entertainment: markerIcons.green,
        volunteer: markerIcons.yellow,
        traditional: markerIcons.blue,
    };

    // Convert dropLocation string to coordinate array if it exists
    const dropCoords = dropLocation
        ? dropLocation.split(",").map((val) => parseFloat(val.trim()))
        : null;

    return (
        <div className="relative h-full w-full">
            <MapContainer center={userLocation} zoom={8} className="h-full w-full rounded-xl relative">
                <ChangeView coords={userLocation} />
                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>
                </LayersControl>
                {/* Listen for map clicks when the pickup field is active */}
                <MapClickHandler onPickupSelect={onPickupSelect} activeField={activeField} />

                {/* Conditionally render event markers only if pickup and drop are not both selected */}
                {!(pickupLocation && dropLocation) &&
                    events
                        .filter((event) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const eventDate = new Date(event.date);
                            eventDate.setHours(0, 0, 0, 0);
                            const isUpcoming = eventDate >= today;
                            const isCategoryMatch =
                                !filteredCategory ||
                                event.category === filteredCategory ||
                                (filteredCategory === specialCategoryName && event.category === specialCategoryName);
                            const isDateMatch = filterDate && eventDate.toDateString() === new Date(filterDate).toDateString();
                            return filterDate ? isDateMatch : (isUpcoming && isCategoryMatch);
                        })
                        .map((event) => (
                            <Marker
                                key={event._id}
                                position={[event.location.coordinates[1], event.location.coordinates[0]]}
                                icon={categoryIcons[event.category] || markerIcons.violet}
                            >
                                <Popup>
                                    <div className="w-48 p-2 bg-white rounded-md shadow-md">
                                        <h3 className="font-bold text-sm text-gray-800">{event.title}</h3>
                                        <div className="max-h-16 overflow-y-auto text-gray-600 text-xs mt-1">
                                            {event.description}
                                        </div>
                                        <div className="mt-1 text-xs">
                                            <p>
                                                <span className="font-semibold text-gray-700">Category:</span> {event.category}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-gray-700">Date:</span>{" "}
                                                {new Date(event.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {event.imageUrl && (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-16 mt-1 rounded object-cover"
                                            />
                                        )}
                                        {onPickupSelect ? <Button
                                            onClick={() => {
                                                const eventLat = event.location.coordinates[1];
                                                const eventLng = event.location.coordinates[0];
                                                if (typeof onDropSelect === "function") {
                                                    onDropSelect(`${eventLat.toFixed(4)}, ${eventLng.toFixed(4)}`);
                                                }
                                            }}
                                            className="flex justify-center items-center bg-purple-600 font-sans text-white px-4 py-2 text-xs  rounded-3xl"
                                        >
                                            Select Event
                                        </Button> : <div className="flex mt-3 gap-3 justify-center">
                                            <Button
                                                onClick={() => {
                                                    const eventLat = event.location.coordinates[1];
                                                    const eventLng = event.location.coordinates[0];
                                                    if (typeof onDropSelect === "function") {
                                                        onDropSelect(`${eventLat.toFixed(4)}, ${eventLng.toFixed(4)}`);
                                                    }
                                                }}
                                                className="bg-green-600 font-sans text-white px-4 py-2 text-xs md:w-16 rounded-3xl"
                                            >
                                                Find
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    const eventLat = event.location.coordinates[1];
                                                    const eventLng = event.location.coordinates[0];
                                                    if (typeof onDropSelect === "function") {
                                                        onDropSelect(`${eventLat.toFixed(4)}, ${eventLng.toFixed(4)}`);
                                                    }
                                                }}
                                                className="bg-blue-500 font-sans text-white px-4 py-2 text-xs md:w-16 rounded-3xl"
                                            >
                                                Offer
                                            </Button>
                                        </div>}
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                }

                {/* show the user's location marker */}
                {!(pickupLocation && dropLocation) && userLocation && <Marker position={userLocation} icon={eventIcon} />}

                {/* If drop (event) location exists, render its marker */}
                {dropCoords && (
                    <Marker position={dropCoords} icon={markerIcons.orange}>
                        <Popup>Event Location</Popup>
                    </Marker>
                )}

                {routeCoords && (
                    <Polyline
                        positions={routeCoords}
                        color="#3b82f6"
                        weight={4}
                        opacity={0.7}
                    />
                )}

                {routeDistance && (
                    <div className="absolute bottom-4 left-4 bg-[#45c541] p-2 rounded shadow text-white z-[1500]">
                        Distance: {(routeDistance / 1000).toFixed(2)} km
                    </div>
                )}


                <LocateButton onPickupSelect={onPickupSelect} />
            </MapContainer>
        </div>
    );
};

export default ShareRideMap;