import CollectorTable from "./CollectorTable";
import AddButton from "../../components/buttons/AddButton";
import AddCollectorModal from "./modals/AddCollectorModal";

const Collectors = () => {
  return (
    <div>
      <AddButton title="add new collector" />
      <AddCollectorModal />
      <CollectorTable />
    </div>
  );
};

export default Collectors;
