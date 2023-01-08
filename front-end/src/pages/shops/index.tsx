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

      <AddButton title="add new shop" />

      <AddShopModal />
      <ShopTable />
    </div>
  );
};

export default Shops;
