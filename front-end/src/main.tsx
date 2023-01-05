import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Collectors from "./pages/collectors";
import Home from "./pages/home";
import Payments from "./pages/payments";
import Shops from "./pages/shops";
import CompanyPage from "./pages/companies";
import GlobalContextProvider from "./context/GlobalContext";
import CollectorContextProvider from "./context/CollectorContext";
import ShopContextProvider from "./context/ShopContext";
import PaymentContextProvider from "./context/PaymentContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     retry: false,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <ShopContextProvider>
          <CollectorContextProvider>
            <PaymentContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/shops" element={<Shops />} />
                    <Route path="/collectors" element={<Collectors />} />
                    <Route path="/companies" element={<CompanyPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </PaymentContextProvider>
          </CollectorContextProvider>
        </ShopContextProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
