import CollectorTable from "./CollectorTable";
import AddButton from "../../components/buttons/AddButton";

const Collectors = () => {
  return (
    <div>
      <AddButton title="add new collector" />
      <CollectorTable />
    </div>
  );
};

export default Collectors;
