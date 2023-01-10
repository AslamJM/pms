import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";

import EditPaymentForm from "../forms/EditPaymentForm";

const EditPaymentModel = () => {
  return (
    <Modal title="Update Payment" type="edit">
      <DialogContent>
        <EditPaymentForm />
      </DialogContent>
    </Modal>
  );
};

export default EditPaymentModel;
