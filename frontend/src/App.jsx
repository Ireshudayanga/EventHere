import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/Router';
import "../src/firebase/firebase.config";
import { useSocket } from "./socket/SocketPrivider";
import RideConfirmPopup from "./components/RideConfirmPopup";
import { toast } from "react-toastify";
import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';

function App() {
  const { incomingRideRequest, setIncomingRideRequest, socket } = useSocket();
  const { currentUser } =  useContext(AuthContext);

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
  
    // 2. Save local message for *yourself*
    const key = `chat_${fromEmail}_${toEmail}`;
    const reverseKey = `chat_${toEmail}_${fromEmail}`;

    console.log("key", key);
    console.log("reverseKey", reverseKey);
  
    const initialMsg = {
      senderId: toEmail,
      senderName: incomingRideRequest.name,
      receiverId: fromEmail,
      message: "🎉 Ride matched successfully! Say hi to your ride partner!",
      timestamp: new Date().toISOString(),
    };
  
    // Only store if nothing exists yet
    if (!localStorage.getItem(key) && !localStorage.getItem(reverseKey)) {
      localStorage.setItem(key, JSON.stringify([initialMsg]));
    }
  
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
