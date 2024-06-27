import ShopTable from "./ShopTable";
import AddButton from "../../components/buttons/AddButton";
import AddShopModal from "./modals/AddShopModal";
import EditShopModel from "./modals/EditShopModal";
import { useAuthContext } from "../../context/AuthContext";
import SnackBar from "../../components/snackbar";
import { PageHeader } from "../../components/header";
import AddArea from "./forms/AddArea";
import AreaList from "./AreaList";

const Shops = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <PageHeader title="Shops" />
      <SnackBar />
      {user?.role === "ADMIN" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AddButton title="add new shop" />
          <AddArea />
        </div>
      )}

      <EditShopModel />
      <AddShopModal />

      <AreaList />
      <h1>List of Shops</h1>
      <ShopTable />
    </div>
  );
};

export default Shops;
