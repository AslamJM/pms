import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useMutation, useQueryClient } from "react-query";
import { paymentClient } from "../../../api/payments";

const DeletePaymentModel = () => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { deletePayment } = paymentClient;
  const { selectedPayment } = usePaymentContext();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => await deletePayment(selectedPayment?._id!),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("all payments");
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
    <Modal title="delete Payment" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this Payment from your list?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            color="warning"
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => mutate()}
            disabled={isLoading}
          >
            delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

export default DeletePaymentModel;
