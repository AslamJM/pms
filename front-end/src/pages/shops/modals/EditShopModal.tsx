import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";

import EditShopForm from "../forms/EditShopForm";

const EditShopModel = () => {
  return (
    <Modal title="edit shop" type="edit">
      <DialogContent>
        <EditShopForm />
      </DialogContent>
    </Modal>
  );
};

export default EditShopModel;
