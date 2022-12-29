import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import AddCollectorForm from "../forms/AddCollectorForm";

const AddCollectorModal = () => {
  return (
    <Modal title="add new collector" type="add">
      <DialogContent>
        <AddCollectorForm />
      </DialogContent>
    </Modal>
  );
};

export default AddCollectorModal;
