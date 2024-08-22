import { Divider, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddButton from "../../components/buttons/AddButton";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import AddPaymentModal from "./modals/AddPaymentModal";
import InvoiceSearch from "../../components/search/InvoiceSearch";
import SnackBar from "../../components/snackbar";
import CompanyPayments from "./CompanyPayments";
import dayjs from "dayjs";
import UpdateInvoiceModal from "./modals/UpdateInvoiceModal";
import SearchShop from "./SearchShop";
import React, { useEffect } from "react";
import { LineGraph } from "../../components/charts/line";
import { BarChart } from "../../components/charts/bar";
import PieChart from "../../components/charts/pie";
import HomePayment from "../../components/tables/HomePayment";
import CompanyButton from "../../components/buttons/CompanyButton";
import { useQuery } from "react-query";
import { apiClient } from "../../api/client";
import { MonthlyBarChart } from "../../components/charts/monthlyBar";
import ShopList from "../../components/charts/chart";
import { DuePayment } from "../../components/tables/DuePayment";
import { BarCharts } from "../../components/charts/barChart";

const Home = () => {
  const { companies } = useGlobalContext();
  const { user } = useAuthContext();

  const getCompanyPayment = async () =>
    (await apiClient.get<Record<string, number>>("/payments/company-income"))
      .data;
  const { data, isLoading, isError } = useQuery(
    "company-income",
    getCompanyPayment
  );

  return (
    <div>
      <SnackBar />
      <AddPaymentModal />
      <UpdateInvoiceModal />
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
          >
            Welcome {user?.role}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
            {dayjs().format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={3} display="flex">
          <HomePayment />
          {/* <DuePayment /> */}
          <Paper
            sx={{
              width: "50%",
              my: 1,
              p: 1,
              boxShadow: 5,
              mt: 2,
              ml: 3,
              borderRadius: "10px",
            }}
          >
            <Typography align="center" sx={{ fontWeight: "bold", mt: "20px" }}>
              Percentage of Payments
            </Typography>
            <Box sx={{ width: "75%", ml: "10%", mt: "20px" }}>
              <PieChart />
            </Box>
          </Paper>
        </Box>
        <Box>
          <Box
            sx={{
              mt: "30px",
              width: "90%",
              boxShadow: 5,
              borderRadius: "10px",
              ml: "50px",
              alignItems: "center",
            }}
          >
            <Typography p={3} align="center" sx={{ fontWeight: "bold" }}>
              Last Month Sales
            </Typography>
            <Box>
              <MonthlyBarChart />
            </Box>
          </Box>
        </Box>
        {/* <Box>
          <Box sx={{ mt: "30px", width: "90%", boxShadow: 5, borderRadius: '10px', ml: "50px", alignItems: "center" }}>
            <Typography p={3} align="center" sx={{ fontWeight: 'bold'}}>
              Monthly Sales Report
            </Typography>
            <Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, ml: 2, mr: 2 }}>
                  {data && companies.sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                  <Box key={c.name} sx={{ flex: 1, minWidth: 120, maxWidth: 200 }}>
                    <CompanyButton title={c.name} />
                  </Box>
                ))}
              </Box>
              <BarChart />
            </Box>
          </Box>
        </Box> */}
      </Box>
    </div>
  );
};

export default Home;
