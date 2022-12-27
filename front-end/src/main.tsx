import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Collectors from "./pages/Collectors";
import Home from "./pages/Home";
import Payments from "./pages/Payments";
import Shops from "./pages/Shops";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
