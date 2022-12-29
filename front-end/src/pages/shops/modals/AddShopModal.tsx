import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import AddShopForm from "../forms/AddShopForm";

const AddShopModal = () => {
  return (
    <Modal title="add new shop" type="add">
      <DialogContent>
        <AddShopForm />
      </DialogContent>
    </Modal>
  );
};

export default AddShopModal;
