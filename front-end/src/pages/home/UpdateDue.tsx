import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { apiClient, IPayment } from "../../api/client";
import currencyFormatter from "currency-formatter";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PaymentCreateInput } from "../../api/payments";

const UpdateDue = ({ payment }: { payment: IPayment }) => {
  const [amount, setAmount] = useState("");
  const [full, setFull] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (input: Partial<PaymentCreateInput>) =>
      await apiClient.patch<{ payment: IPayment; message: string }>(
        `/payments/update/${payment._id}`,
        { input }
      ),
    {
      onSettled: () => {
        queryClient.refetchQueries("payment shops");
        setAmount("");
      },
    }
  );

  return (
    <Paper sx={{ background: "#f1f1f1", px: 1, py: 1 }}>
      <Typography component="em"># {payment.invoice}</Typography>
      <Typography sx={{ color: "GrayText" }}>{payment.company.name}</Typography>
      <Divider />
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ fontSize: 14 }}>Total :</Typography>
        <Typography sx={{ fontSize: 14 }}>
          {currencyFormatter.format(payment.totalAmount, {})}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ fontSize: 14 }}> Due :</Typography>
        <Typography sx={{ fontSize: 14 }}>
          {currencyFormatter.format(payment.dueAmount, {})}
        </Typography>
      </Box>
      <Box display="flex" mt={1}>
        <TextField
          size="small"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              value={full}
              onChange={() => {
                setFull(true);
                setAmount(payment.dueAmount.toString());
              }}
            />
          }
          label="Full"
          sx={{ ml: 1 }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            mutate({
              paidAmount: payment.paidAmount + Number(amount),
              dueAmount: payment.dueAmount - Number(amount),
              paymentStatus: full ? "PAID" : "DUE",
            })
          }
        >
          update
        </Button>
      </Box>
    </Paper>
  );
};

export default UpdateDue;
