import PaymentTable from "./PaymentTable";
import AddButton from "../../components/buttons/AddButton";
import ResetButton from "../../components/buttons/ResetButton";
import AddPaymentModal from "./modals/AddPaymentModal";
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
        <AddButton title="add new payment" />
        <ExportExcelButton />
        <ResetButton />
      </Box>
      <EditPaymentModel />
      <AddPaymentModal />
      <PaymentTable />
    </div>
  );
};

export default Payments;
