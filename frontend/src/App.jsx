import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/Router';
import "../src/firebase/firebase.config";

import { useSocket } from "./socket/SocketPrivider";
import RideConfirmPopup from "./components/RideConfirmPopup";
import { toast } from "react-toastify";

function App() {
  const { incomingRideRequest, setIncomingRideRequest, socket } = useSocket();

  const handleAccept = () => {
    socket.current.emit("ride-confirmed", {
      to: incomingRideRequest.from,
    });
    toast.success("You accepted the ride request.");
    setIncomingRideRequest(null);
  };

  const handleReject = () => {
    socket.current.emit("ride-rejected", {
      to: incomingRideRequest.from,
    });
    toast.info("You rejected the ride request.");
    setIncomingRideRequest(null);
  };

  return (
    <>
      {/* Main Router */}
      <RouterProvider router={router} />

      {/* Ride match popup */}
      {incomingRideRequest && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[3000]">
          <RideConfirmPopup
            request={incomingRideRequest}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      )}
    </>
  );
}

export default App;
