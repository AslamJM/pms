import PaymentTable from "./PaymentTable";
import AddButton from "../../components/buttons/AddButton";

const Payments = () => {
  return (
    <div>
      <AddButton title="add new payment" />
      <PaymentTable />
    </div>
  );
};

export default Payments;
