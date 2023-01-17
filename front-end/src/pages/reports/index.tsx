import PaymentTableSelect from "../../components/tables/SelectTable";
import ReportFilters from "./ReportFilters";

const Reports = () => {
  return (
    <div>
      <ReportFilters />
      <PaymentTableSelect />
    </div>
  );
};

export default Reports;
