import FilterByShop from "../../components/Filters/paymentFilters/FilterByShop";
import FilterByCompany from "../../components/Filters/paymentFilters/FilterByCompany";
import FilterByCollector from "../../components/Filters/paymentFilters/FilterByCollector";
import FilterByStatus from "../../components/Filters/paymentFilters/FilterByStatus";
import FilterByRegion from "../../components/Filters/paymentFilters/FilterByRegion";
import DateRangeFilter from "../../components/Filters/paymentFilters/DateRangeFilter";
import Typography from "@mui/material/Typography";

const PaymentFilters = () => {
  return (
    <>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <FilterByShop />
        <FilterByCompany />
        <FilterByCollector />
        <FilterByStatus />
        <FilterByRegion />
      </div>
      <div>
        <Typography variant="body1" sx={{ mb: 1 }}>
          filter by date range
        </Typography>
        <DateRangeFilter></DateRangeFilter>
      </div>
    </>
  );
};

export default PaymentFilters;
