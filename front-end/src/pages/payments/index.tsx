import PaymentTable from "./PaymentTable";
import EditPaymentModel from "./modals/EditPaymentModal";
import PaymentFilters from "./PaymentFilters";
import SnackBar from "../../components/snackbar";

const Payments = () => {
  return (
    <div>
      <SnackBar />
      <PaymentFilters />
      <EditPaymentModel />
      <PaymentTable />
    </div>
  );
};

export default Payments;
