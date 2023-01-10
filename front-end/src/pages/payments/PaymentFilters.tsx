import FilterByShop from "../../components/Filters/paymentFilters/FilterByShop";
import FilterByCompany from "../../components/Filters/paymentFilters/FilterByCompany";
import FilterByCollector from "../../components/Filters/paymentFilters/FilterByCollector";
import FilterByStatus from "../../components/Filters/paymentFilters/FilterByStatus";
import FilterByRegion from "../../components/Filters/paymentFilters/FilterByRegion";
import PaymentDateFilter from "../../components/Filters/paymentFilters/PaymentDateFilter";
import DateRangeFilter from "../../components/Filters/paymentFilters/DateRangeFilter";
import VerifedFilter from "../../components/Filters/paymentFilters/VerifiedFilter";
import Typography from "@mui/material/Typography";

const PaymentFilters = () => {
  return (
    <>
      <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
        <FilterByShop />
        <FilterByCompany />
        <FilterByCollector />
        <FilterByStatus />
        <VerifedFilter />
      </div>
      <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
        <div>
          <Typography variant="body1" sx={{ mb: 1 }}>
            select payment date
          </Typography>
          <PaymentDateFilter />
        </div>
        <div>
          <Typography variant="body1" sx={{ mb: 1 }}>
            filter by date range
          </Typography>
          <DateRangeFilter></DateRangeFilter>
        </div>
      </div>
    </>
  );
};

export default PaymentFilters;
