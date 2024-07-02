import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import AddCollectorForm from "../forms/AddCollectorForm";

const AddCollectorModal = () => {
  return (
    <Modal title="Add New Collector" type="add">
      <DialogContent>
        <AddCollectorForm />
      </DialogContent>
    </Modal>
  );
};

export default AddCollectorModal;
