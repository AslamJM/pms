import CollectorTable from "./CollectorTable";
import AddButton from "../../components/buttons/AddButton";
import AddCollectorModal from "./modals/AddCollectorModal";
import DeleteCollectorModel from "./modals/DeleteCollectorModal";
import EditCollectorModel from "./modals/EditCollectorModal";
import SnackBar from "../../components/snackbar";
import { useAuthContext } from "../../context/AuthContext";
import { PageHeader } from "../../components/header";

const Collectors = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <PageHeader title="Collectors" />
      <SnackBar />
      <EditCollectorModel />
      <DeleteCollectorModel />
      {user?.role === "ADMIN" && <AddButton title="add new collector" />}

      <AddCollectorModal />
      <CollectorTable />
    </div>
  );
};

export default Collectors;
