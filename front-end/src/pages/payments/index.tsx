import PaymentTable from "./PaymentTable";
import EditPaymentModel from "./modals/EditPaymentModal";
import PaymentFilters from "./PaymentFilters";
import SnackBar from "../../components/snackbar";
import { PageHeader } from "../../components/header";

const Payments = () => {
  return (
    <div>
      <PageHeader title="Payments" />
      <SnackBar />
      <PaymentFilters />
      <EditPaymentModel />
      <PaymentTable />
    </div>
  );
};

export default Payments;
