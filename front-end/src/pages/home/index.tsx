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

const Home = () => {
  const { companies } = useGlobalContext();
  const { user } = useAuthContext();

  return (
    <div>
      <SnackBar />
      <AddPaymentModal />
      <UpdateInvoiceModal />
      <Box>
        <Typography variant="h5">Welcome {user?.role}</Typography>
        <Typography variant="h6">{dayjs().format("DD/MM/YYYY")}</Typography>
        <Divider />
        <Box display="flex">
          <CompanyPayments />
          {user?.role === "ADMIN" && (
            <div style={{ flexGrow: 1, padding: 10 }}>
              <Typography variant="h5">Payments</Typography>
              <Divider />
              <Box display="flex" mt={1}>
                <AddButton title="add new payment" />
                <Divider sx={{ height: 50, mx: 1 }} orientation="vertical" />
                <InvoiceSearch />
              </Box>
            </div>
          )}
        </Box>
      </Box>
      <div> {user?.role === "ADMIN" && <SearchShop />}</div>
    </div>
  );
};

export default Home;
