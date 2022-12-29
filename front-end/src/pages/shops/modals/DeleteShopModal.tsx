import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";

const deleteShopModel = () => {
  const { setDeleteModalOpen } = useGlobalContext();

  return (
    <Modal title="delete shop" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this product?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>cancel</Button>
          <Button>delete</Button>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

export default deleteShopModel;
