import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddButton from "../../components/buttons/AddButton";
import { useGlobalContext } from "../../context/GlobalContext";
import AddPaymentModal from "./modals/AddPaymentModal";
import InvoiceSearch from "../../components/search/InvoiceSearch";
import SnackBar from "../../components/snackbar";
import dayjs from "dayjs";

const Home = () => {
  const { companies } = useGlobalContext();

  return (
    <div>
      <SnackBar />
      <AddPaymentModal />
      <Box>
        <Typography variant="h5">Welcome user</Typography>
        <Typography variant="h6">
          {dayjs().add(-1, "day").format("DD/MM/YYYY")}
        </Typography>
        <Divider />
      </Box>
      <div>
        <Typography variant="h5">Payments</Typography>
        <Divider />
        <Box display="flex" mt={1}>
          <AddButton title="add new payment" />
          <Divider sx={{ height: 50, mx: 1 }} orientation="vertical" />
          <InvoiceSearch />
        </Box>
      </div>
    </div>
  );
};

export default Home;
