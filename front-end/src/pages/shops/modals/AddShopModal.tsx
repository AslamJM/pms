import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import AddShopForm from "../forms/AddShopForm";

const AddShopModal = () => {
  return (
    <Modal title="Add New Shop" type="add">
      <DialogContent>
        <AddShopForm />
      </DialogContent>
    </Modal>
  );
};

export default AddShopModal;
