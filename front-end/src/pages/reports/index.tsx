import PaymentTableSelect from "../../components/tables/SelectTable";
import ReportFilters from "./ReportFilters";
import { PageHeader } from "../../components/header";

const Reports = () => {
  return (
    <div>
      <PageHeader title="Reports" />
      <ReportFilters />
      <PaymentTableSelect />
    </div>
  );
};

export default Reports;
