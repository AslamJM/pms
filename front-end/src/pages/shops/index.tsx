import ShopTable from "./ShopTable";
import AddButton from "../../components/buttons/AddButton";
import AddShopModal from "./modals/AddShopModal";
import EditShopModel from "./modals/EditShopModal";
import SnackBar from "../../components/snackbar";

const Shops = () => {
  return (
    <div>
      <SnackBar />

      <AddButton title="add new shop" />
      <EditShopModel />
      <AddShopModal />
      <ShopTable />
    </div>
  );
};

export default Shops;
