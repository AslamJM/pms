import PaymentTable from "./PaymentTable";
import AddButton from "../../components/buttons/AddButton";
import ResetButton from "../../components/buttons/ResetButton";
import AddPaymentModal from "./modals/AddPaymentModal";
import PaymentFilters from "./PaymentFilters";
import { Box } from "@mui/system";

const Payments = () => {
  return (
    <div>
      <PaymentFilters />
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <AddButton title="add new payment" />
        <ResetButton />
      </Box>

      <AddPaymentModal />
      <PaymentTable />
    </div>
  );
};

export default Payments;
