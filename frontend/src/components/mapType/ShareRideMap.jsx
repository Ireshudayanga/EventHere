/* eslint-disable react/prop-types */
// ShareRideMap.jsx
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCrosshairs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import Button from "../Button";
import { Polyline } from "react-leaflet";
import locationIcon from '../../assets/images/location.png';
import { useSocket } from "../../socket/SocketPrivider"

const { BaseLayer } = LayersControl;


// Custom marker icon for the user's location
const eventIcon = new L.Icon({
    iconUrl: locationIcon,
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
const LocateButton = ({ setUserLocation }) => {
    const map = useMap();

    const handleLocateMe = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];

                    // Update map view but do NOT change pickup/drop locations
                    map.flyTo(userCoords, 16, { animate: true, duration: 1.5 });

                    // Update userLocation state
                    if (typeof setUserLocation === "function") {
                        setUserLocation(userCoords);
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
const MapClickHandler = ({ onPickupSelect, activeField, isPickupSelected, setIsPickupSelected }) => {
    const [pickupPosition, setPickupPosition] = useState(null);
    //console.log("Pickup Position:", pickupPosition);

    useMapEvent("click", (e) => {
        if (activeField === "pickup" && !isPickupSelected) {
            const { lat, lng } = e.latlng;
            const newPosition = [lat, lng];
            //  console.log("New Pickup Position:", newPosition);
            setPickupPosition(newPosition);
            setIsPickupSelected(true);
            if (typeof onPickupSelect === "function") {
                onPickupSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
        }
    });

    return pickupPosition ? <Marker position={pickupPosition} icon={markerIcons.grey} /> : null;
};

const InvalidateMapSize = ({ isRideMatched }) => {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 500); // wait for the panel animation
    }, [isRideMatched]);

    return null;
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
    dropLocation,
    isRideMatched,   // new prop from parent
}) => {




    const [partnerCoords, setPartnerCoords] = useState(null);
    const markerRef = useRef();
    const { socket } = useSocket();
    const [userLocation, setUserLocation] = useState([7.8731, 80.7718]); // Default location
    const [filteredCategory, setFilteredCategory] = useState("");
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const [routeCoords, setRouteCoords] = useState(null);
    const [isPickupSelected, setIsPickupSelected] = useState(false);
    const [routeDistance, setRouteDistance] = useState(null);

    // console.log("Route Distance:", routeDistance);


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

                        // Set the route distance 
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
        if (!socket?.current) return;

        socket.current.on("partner-location", ({ lat, lng }) => {
            if (!markerRef.current) {
                setPartnerCoords([lat, lng]);
            } else {
                const marker = markerRef.current;
                const current = marker.getLatLng();
                const next = L.latLng(lat, lng);

                const duration = 300;
                let start = null;

                const animate = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const ratio = Math.min(progress / duration, 1);

                    const interpolated = L.latLng(
                        current.lat + (next.lat - current.lat) * ratio,
                        current.lng + (next.lng - current.lng) * ratio
                    );

                    marker.setLatLng(interpolated);

                    if (ratio < 1) requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
            }
        });
    }, [socket]);


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

    //console.log("Drop Coords:", dropCoords);

    return (
        <div className="relative h-full w-full">
            <MapContainer center={userLocation} zoom={8} className="h-full w-full rounded-xl relative">
                <InvalidateMapSize isRideMatched={isRideMatched} />
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
                <MapClickHandler onPickupSelect={onPickupSelect} activeField={activeField} isPickupSelected={isPickupSelected} setIsPickupSelected={setIsPickupSelected} />

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
                                    <div className="w-64 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                                        {/* Image Header */}
                                        {event.imageUrl && (
                                            <div className="h-24 w-full overflow-hidden">
                                                <img
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-4 space-y-2">
                                            {/* Title */}
                                            <h3 className="text-base font-bold text-gray-900">{event.title}</h3>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 leading-snug line-clamp-3">
                                                {event.description}
                                            </p>

                                            {/* Info Block */}
                                            <div className="text-xs text-gray-700 bg-gray-50 rounded-lg p-2 space-y-1 border">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Date:</span>
                                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Time:</span>
                                                    <span>{event.time || "TBA"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Type:</span>
                                                    <span className="capitalize">{event.category}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="pt-2 flex justify-between items-center gap-2">
                                                {onPickupSelect ? (
                                                    <Button
                                                        onClick={() => {
                                                            const [lat, lng] = [event.location.coordinates[1], event.location.coordinates[0]];
                                                            onDropSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                                                        }}
                                                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-1.5 rounded-lg w-full"
                                                    >
                                                        Select Event
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <Button
                                                            onClick={() => {
                                                                const [lat, lng] = [event.location.coordinates[1], event.location.coordinates[0]];
                                                                onDropSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                                                            }}
                                                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg w-full"
                                                        >
                                                            Find
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                const [lat, lng] = [event.location.coordinates[1], event.location.coordinates[0]];
                                                                onDropSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                                                            }}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg w-full"
                                                        >
                                                            Offer
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
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


                <LocateButton setUserLocation={setUserLocation} />


                {/* Real time tracking */}
                {partnerCoords && (
                    <Marker
                        position={partnerCoords}
                        icon={markerIcons.red}
                        ref={markerRef}
                    >

                    </Marker>
                )}


            </MapContainer>
        </div>
    );
};

export default ShareRideMap;