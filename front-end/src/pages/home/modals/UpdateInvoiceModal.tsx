import {
  Box,
  Button,
  DialogContent,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import Modal from "../../../components/modals/MainModal";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useMutation } from "react-query";
import { PaymentCreateInput } from "../../../api/payments";
import { apiClient, IPayment } from "../../../api/client";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import currencyFormatter from "currency-formatter";

const UpdateInvoiceModal = () => {
  const { selectedPayment, setSelectedPayment } = usePaymentContext();
  const {
    setEditModalOpen,

    setLoading,
    setSnackMessage,
    setSnackOpen,
  } = useGlobalContext();
  const [due, setDue] = useState(selectedPayment?.dueAmount.toString());
  const [paid, setPaid] = useState(false);

  const { mutate, isLoading } = useMutation(
    async (input: Partial<PaymentCreateInput>) =>
      await apiClient.patch<{ payment: IPayment; message: string }>(
        `/payments/update/${selectedPayment?._id}`,
        { input }
      ),
    {
      onSettled: () => setDue(""),
    }
  );

  return (
    <Modal title="update invoice" type="edit">
      <DialogContent>
        <Typography>Invoice no: {selectedPayment?.invoice}</Typography>
        <Typography>
          Last Payment:
          {dayjs(selectedPayment?.updatedAt).format("DD/MM/YYYY")}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Box display="flex">
          <Typography>Shop: </Typography>
          <Typography color="GrayText">{selectedPayment?.shop.name}</Typography>
        </Box>
        <Box display="flex">
          <Typography>Region: </Typography>
          <Typography color="GrayText">
            {selectedPayment?.shop.region.name}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography>Company: </Typography>
          <Typography color="GrayText">
            {selectedPayment?.company.name}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography>Collector: </Typography>
          <Typography color="GrayText">
            {selectedPayment?.collector.name}
          </Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box>
          <Typography>
            Paid Amount:{" "}
            {currencyFormatter.format(selectedPayment?.paidAmount!, {})}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ mr: 0.5 }}>
              Due:{currencyFormatter.format(selectedPayment?.dueAmount!, {})}
            </Typography>
            <TextField
              placeholder="enter amount"
              size="small"
              sx={{ mr: 0.5 }}
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={paid}
                  onChange={() => setPaid((pr) => !pr)}
                />
              }
              label="Fully Paid"
            />
            <Button
              variant="contained"
              onClick={() => {
                mutate(
                  {
                    dueAmount: selectedPayment?.dueAmount! - Number(due),
                    paidAmount: selectedPayment?.paidAmount! + Number(due),
                    paymentStatus: paid ? "PAID" : "DUE",
                  },
                  {
                    onSuccess: (data) => {
                      setSelectedPayment(null);
                      setLoading(false);
                      setSnackMessage(data.data.message);
                      setSnackOpen(true);
                    },
                    onError: (error: any) => {
                      setSnackMessage(error.message);
                      setSnackOpen(true);
                    },
                    onSettled: () => {
                      setLoading(false);
                      setEditModalOpen(false);
                    },
                  }
                );
              }}
            >
              {isLoading ? <CircularProgress /> : "update"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Modal>
  );
};

export default UpdateInvoiceModal;
