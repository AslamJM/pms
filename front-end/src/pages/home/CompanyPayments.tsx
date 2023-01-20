import { usePaymentContext } from "../../context/PaymentContext";
import { useGlobalContext } from "../../context/GlobalContext";

const CompanyPayments = () => {
  const { payments } = usePaymentContext();
  const { companies } = useGlobalContext();

  return <div>CompanyPayments</div>;
};

export default CompanyPayments;
