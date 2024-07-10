import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useCollectorContext } from "../../../context/CollectorContext";
import { useMutation, useQueryClient } from "react-query";
import { collectorClient } from "../../../api/collectors";

const DeleteCollectorModel = () => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { deleteCollector } = collectorClient;
  const { selectedCollector } = useCollectorContext();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => await deleteCollector(selectedCollector?._id!),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("all collectors");
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
    <Modal title="Delete Collector" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this collector from your list?
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => mutate()}
            disabled={isLoading}
            color="error"
          >
            delete
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

export default DeleteCollectorModel;
