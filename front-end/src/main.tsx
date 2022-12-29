import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Collectors from "./pages/collectors";
import Home from "./pages/home";
import Payments from "./pages/payments";
import Shops from "./pages/shops";
import GlobalContextProvider from "./context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/collectors" element={<Collectors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
