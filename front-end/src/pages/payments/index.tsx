import PaymentTable from "./PaymentTable";
import AddButton from "../../components/buttons/AddButton";
import AddPaymentModal from "./modals/AddPaymentModal";

const Payments = () => {
  return (
    <div>
      <AddButton title="add new payment" />
      <AddPaymentModal />
      <PaymentTable />
    </div>
  );
};

export default Payments;
