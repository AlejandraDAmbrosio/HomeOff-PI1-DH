import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./Components/utils/global.context.jsx";
import { ModalProvider } from "./Components/utils/global.contextModal.jsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
    <ModalProvider>
      
        <BrowserRouter>
          <App />
        </BrowserRouter>
    
    </ModalProvider>
    </ContextProvider>
  </React.StrictMode>
);
