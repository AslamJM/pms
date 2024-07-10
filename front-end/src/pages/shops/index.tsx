import ShopTable from "./ShopTable";
import AddButton from "../../components/buttons/AddButton";
import AddShopModal from "./modals/AddShopModal";
import EditShopModel from "./modals/EditShopModal";
import { useAuthContext } from "../../context/AuthContext";
import SnackBar from "../../components/snackbar";
import { PageHeader } from "../../components/header";
import AddArea from "./forms/AddArea";
import AreaList from "./AreaList";
import { Box, Grid } from "@mui/material";

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
          <AddButton title="Add New Shop" />
          <AddArea />
        </div>
      )}

      <EditShopModel />
      <AddShopModal />
      
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <AreaList />
        </Grid>
        <Grid item xs={1} md={4}>
          <ShopTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Shops;
