import ShopTable from "./ShopTable";
import AddButton from "../../components/buttons/AddButton";
import AddShopModal from "./modals/AddShopModal";
import { useGlobalContext } from "../../context/GlobalContext";
import SnackBar from "../../components/snackbar";
import {
  FilterByPaymentStatus,
  FilterByRegion,
} from "../../components/Filters/shopFilters";
import Box from "@mui/material/Box";

const Shops = () => {
  return (
    <div>
      <SnackBar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <AddButton title="add new shop" />
        <Box display="flex">
          <FilterByRegion />
          <FilterByPaymentStatus />
        </Box>
      </Box>
      <AddShopModal />
      <ShopTable />
    </div>
  );
};

export default Shops;
