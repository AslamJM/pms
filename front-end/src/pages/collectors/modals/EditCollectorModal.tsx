import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";

import EditCollectorForm from "../forms/EditCollectorForm";

const EditCollectorModel = () => {
  return (
    <Modal title="Update Collector" type="edit">
      <DialogContent>
        <EditCollectorForm />
      </DialogContent>
    </Modal>
  );
};

export default EditCollectorModel;
