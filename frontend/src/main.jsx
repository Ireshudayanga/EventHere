import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "../redux/store.js"; // Import Redux Store
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}> {/* Wrap the app inside Redux Provider */}
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
