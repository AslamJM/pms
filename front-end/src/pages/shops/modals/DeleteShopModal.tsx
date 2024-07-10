import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useShopContext } from "../../../context/ShopContext";
import { useMutation, useQueryClient } from "react-query";
import { shopClient } from "../../../api/shops";
import CircularProgress from "@mui/material/CircularProgress";

const DeleteShopModel = () => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { deleteShop } = shopClient;
  const { selectedShop } = useShopContext();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => await deleteShop(selectedShop?._id!),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("all shops");
        setLoading(false);
        setSnackMessage(data.message);
        setSnackOpen(true);
      },
      onError: (error: any) => {
        setSnackMessage(error.message);
        setSnackOpen(true);
      },
      onSettled: () => {
        setLoading(false);
        setDeleteModalOpen(false);
      },
    }
  );

  return (
    <Modal title="Delete Shop" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this shop from your list?
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => mutate()}
            disabled={isLoading}
            color="error"
          >
            {isLoading ? <CircularProgress /> : "delete"}
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
          >
            cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

export default DeleteShopModel;
