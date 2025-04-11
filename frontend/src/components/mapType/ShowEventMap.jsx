/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCrosshairs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import locationIcon from '../../assets/images/location.png';
import Button from "../Button";

const { BaseLayer } = LayersControl;

const eventIcon = new L.Icon({
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

const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(coords, 8, { animate: true, duration: 1.5 });
    }, [coords, map]);
    return null;
};

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
                {
                    enableHighAccuracy: true,
                    timeout: 75000,
                    maximumAge: 0,
                }
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
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]);
    const [filteredCategory, setFilteredCategory] = useState("");
    const [routeCoords, setRouteCoords] = useState(null);
    const [routeDistance, setRouteDistance] = useState(null);
    const [destination, setDestination] = useState(null);

    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);

    const mapRef = useRef();

    useEffect(() => {
        dispatch(fetchSpecialCategory());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCategory(categoryType);
    }, [categoryType, filterDate]);

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
                {
                    enableHighAccuracy: true,
                    timeout: 75000,
                    maximumAge: 0,
                }
            );
        }
    }, []);

    const categoryIcons = {
        entertainment: markerIcons.green,
        volunteer: markerIcons.yellow,
        traditional: markerIcons.blue,
    };

    const handleShowDirection = (event, userLocation) => {
        const eventCoords = [event.location.coordinates[1], event.location.coordinates[0]];
        setDestination({ start: userLocation, end: eventCoords });
    };

    useEffect(() => {
        const calculateRoute = async () => {
            if (destination?.start && destination?.end) {
                const [startLat, startLng] = destination.start;
                const [endLat, endLng] = destination.end;

                try {
                    const response = await fetch(
                        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
                    );
                    const data = await response.json();

                    if (data.routes?.[0]?.geometry) {
                        const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                        setRouteCoords(coords);
                        setRouteDistance(data.routes[0].distance);

                        const map = mapRef.current;
                        if (map) {
                            map.closePopup();
                            const bounds = L.latLngBounds(coords);
                            map.flyToBounds(bounds, {
                                padding: [50, 50],
                                duration: 1.5,
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error fetching route:", error);
                    setRouteCoords(null);
                    setRouteDistance(null);
                }
            }
        };

        calculateRoute();
    }, [destination]);

    const formatDistance = (distanceInMeters) => {
        if (!distanceInMeters) return "";
        const km = distanceInMeters / 1000;
        return `${km.toFixed(2)} km`;
    };

    const routeMidpoint = routeCoords
        ? routeCoords[Math.floor(routeCoords.length / 2)]
        : null;

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={userLocation}
                zoom={8}
                className="h-full w-full rounded-xl relative"
                whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
            >
                <ChangeView coords={userLocation} />

                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>
                </LayersControl>

                {events.filter(event => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const eventDate = new Date(event.date);
                    eventDate.setHours(0, 0, 0, 0);
                    const isUpcoming = eventDate >= today;
                    const isCategoryMatch = !filteredCategory || event.category === filteredCategory || (filteredCategory === specialCategoryName && event.category === specialCategoryName);
                    const isDateMatch = filterDate && eventDate.toDateString() === new Date(filterDate).toDateString();
                    if (filterDate) {
                        return isDateMatch;
                    } else {
                        return isUpcoming && isCategoryMatch || (filteredCategory === specialCategoryName && event.category === specialCategoryName);
                    }
                }).map(event => (
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
                                    <p><span className="font-semibold text-gray-700">Category:</span> {event.category}</p>
                                    <p><span className="font-semibold text-gray-700">Date:</span> {new Date(event.date).toISOString().split('T')[0]}</p>
                                </div>
                                {event.imageUrl && (
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-16 mt-1 rounded object-cover"
                                    />
                                )}
                                <Button
                                    onClick={() => handleShowDirection(event, userLocation)}
                                    className="mt-2 w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600 transition"
                                >
                                    Direction
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {userLocation && <Marker position={userLocation} icon={eventIcon} />}
                <LocateButton setSelectedLocation={setSelectedLocation} />

                {routeCoords && (
                    <Polyline
                        positions={routeCoords}
                        color="blue"
                        weight={4}
                        opacity={0.7}
                    />
                )}

                {routeMidpoint && routeDistance && (
                    <Marker
                        position={routeMidpoint}
                        icon={L.divIcon({
                            className: 'custom-distance-label',
                            html: `<div style="
                                background-color: #1A73E8;
                                width: 100px;
                                padding: 12px 10px;
                                border-radius: 6px;
                                box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                                font-size: 15px;
                                color: white;
                                font-weight: 500;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                text-align: center;
                            ">
                                ${formatDistance(routeDistance)}
                            </div>`,
                        })}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default ShowEventMap;
