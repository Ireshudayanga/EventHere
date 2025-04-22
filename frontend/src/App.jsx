import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";
import Maintenance from "../src/pages/Maintenance/Maintenance";



// Firebase Analytics
import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase/firebase.config";

// Contexts and Hooks
import { useSocket } from "./socket/SocketPrivider";
import { AuthContext } from "./context/AuthProvider";

// Components
import RideConfirmPopup from "./components/RideConfirmPopup";
import AnalyticsTracker from "./components/AnalyticsTracker";
import router from "./router/Router";
import "./App.css";

function App() {
  const { incomingRideRequest, setIncomingRideRequest, socket } = useSocket();
  const { currentUser } = useContext(AuthContext);
  
  
  // ✅ For Maintenance Mode
  // Check if the app is in maintenance mode
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";
  if (isMaintenance) return <Maintenance />;




  // ✅ Handle ride acceptance
  const handleAccept = () => {
    const fromEmail = currentUser?.email;
    const toEmail = incomingRideRequest?.from;
    const fromName = currentUser?.displayName;

    console.log("incomingRideRequest", incomingRideRequest);

    // 1. Emit to other user
    socket.current.emit("ride-confirmed", {
      to: toEmail,
      from: fromEmail,
      name: fromName,
    });

    // 2. Save message locally
    const key = `chat_${fromEmail}_${toEmail}`;
    const reverseKey = `chat_${toEmail}_${fromEmail}`;
    const initialMsg = {
      senderId: toEmail,
      senderName: incomingRideRequest.name,
      receiverId: fromEmail,
      message: "🎉 Ride matched successfully! Say hi to your ride partner!",
      timestamp: new Date().toISOString(),
    };

    if (!localStorage.getItem(key) && !localStorage.getItem(reverseKey)) {
      localStorage.setItem(key, JSON.stringify([initialMsg]));
    }

    // ✅ Log Firebase Analytics Event
    if (analytics) {
      logEvent(analytics, "ride_accepted", {
        from_user: fromEmail,
        to_user: toEmail,
        partner_name: incomingRideRequest?.name,
      });
    }

    toast.success("You accepted the ride request.");
    setIncomingRideRequest(null);
  };

  // ❌ Handle ride rejection
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
