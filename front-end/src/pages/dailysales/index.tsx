import PaymentTable from "./PaymentTable";
import EditPaymentModel from "./modals/EditPaymentModal";
import PaymentFilters from "./PaymentFilters";
import SnackBar from "../../components/snackbar";
import { PageHeader } from "../../components/header";
import { Divider } from "@mui/material";

const DailySales = () => {
  return (
    <div>
      <PageHeader title="Daily Sales"/>
      <SnackBar />
      <PaymentFilters />
      <Divider sx={{ mt: 2 }}/>
      <EditPaymentModel />
      <PaymentTable />
    </div>
  );
};

export default DailySales;
