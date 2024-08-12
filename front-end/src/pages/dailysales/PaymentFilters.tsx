import FilterByShop from "../../components/Filters/paymentFilters/FilterByShop";
import FilterByCompany from "../../components/Filters/paymentFilters/FilterByCompany";
import FilterByCollector from "../../components/Filters/paymentFilters/FilterByCollector";
import FilterByStatus from "../../components/Filters/paymentFilters/FilterByStatus";
import FilterByRegion from "../../components/Filters/paymentFilters/FilterByRegion";
import PaymentDateFilter from "../../components/Filters/paymentFilters/PaymentDateFilter";
import DateRangeFilter from "../../components/Filters/paymentFilters/DateRangeFilter";
import VerifedFilter from "../../components/Filters/paymentFilters/VerifiedFilter";
import Typography from "@mui/material/Typography";
import ResetButton from "../../components/buttons/ResetButton";
import LimitFilter from "../../components/Filters/paymentFilters/LimitFilter";

const PaymentFilters = () => {
  return (
    <>
      <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
        <FilterByShop />
        <FilterByCompany />
        <FilterByCollector />
        <FilterByStatus />
        <VerifedFilter />
        {/* //<FilterByRegion /> */}
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <PaymentDateFilter />
        {/* <LimitFilter /> */}
        <DateRangeFilter />
        <ResetButton />
      </div>
    </>
  );
};

export default PaymentFilters;
