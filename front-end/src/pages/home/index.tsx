import { Divider, Typography } from "@mui/material";
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
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';

const Home = () => {
  const { companies } = useGlobalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Roboto:400,700',
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Merriweather:400,700',
          'Playfair Display:400,700',
          'Poppins:400,700'
        ]
      }
    });
  }, []);

  return (
    <div>
      <SnackBar />
      <AddPaymentModal />
      <UpdateInvoiceModal />
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Merriweather' }}>
            Welcome {user?.role}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto'}}>
            {dayjs().format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} display="flex">
          <CompanyPayments />
          {user?.role === "ADMIN" && (
            <Box ml={2} flexGrow={1} >
              <Typography variant="h5" sx={{ fontFamily: 'Poppins' }}>Payments</Typography>
              <Divider />
              <Box mb={4} display="flex" mt={3} >
                <AddButton title="Add New Payment" />
                <Divider sx={{ height: 50, mx: 1 }} orientation="vertical" />
                <InvoiceSearch />
              </Box>
              <Divider />
              <Box mt={2}>
                <SearchShop />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
