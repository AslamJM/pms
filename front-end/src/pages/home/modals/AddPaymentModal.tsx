import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import AddPaymentForm from "../forms/AddPaymentForm";

const AddPaymentModal = () => {
  return (
    <Modal title="Add Payment" type="add">
      <DialogContent>
        <AddPaymentForm />
      </DialogContent>
    </Modal>
  );
};

export default AddPaymentModal;
