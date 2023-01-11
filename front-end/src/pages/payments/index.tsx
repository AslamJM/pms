import PaymentTable from "./PaymentTable";
import ResetButton from "../../components/buttons/ResetButton";
import EditPaymentModel from "./modals/EditPaymentModal";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import PaymentFilters from "./PaymentFilters";
import SnackBar from "../../components/snackbar";
import { Box } from "@mui/system";

const Payments = () => {
  return (
    <div>
      <SnackBar />
      <PaymentFilters />
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <ExportExcelButton />
        <ResetButton />
      </Box>
      <EditPaymentModel />

      <PaymentTable />
    </div>
  );
};

export default Payments;
