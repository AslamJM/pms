import CollectorTable from "./CollectorTable";
import AddButton from "../../components/buttons/AddButton";
import AddCollectorModal from "./modals/AddCollectorModal";
import DeleteCollectorModel from "./modals/DeleteCollectorModal";
import EditCollectorModel from "./modals/EditCollectorModal";
import SnackBar from "../../components/snackbar";

const Collectors = () => {
  return (
    <div>
      <SnackBar />
      <EditCollectorModel />
      <DeleteCollectorModel />
      <AddButton title="add new collector" />
      <AddCollectorModal />
      <CollectorTable />
    </div>
  );
};

export default Collectors;
