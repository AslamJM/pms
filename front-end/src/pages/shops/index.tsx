import ShopTable from "./ShopTable";
import AddButton from "../../components/buttons/AddButton";
import AddShopModal from "./modals/AddShopModal";
import { useGlobalContext } from "../../context/GlobalContext";

const Shops = () => {
  return (
    <div>
      <AddButton title="add new shop" />
      <AddShopModal />
      <ShopTable />
    </div>
  );
};

export default Shops;
