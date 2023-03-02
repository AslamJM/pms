import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { apiClient, IPayment } from "../../api/client";
import currencyFormatter from "currency-formatter";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useCollectorContext } from "../../context/CollectorContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";

const UpdateDue = ({ payment }: { payment: IPayment }) => {
  const [amount, setAmount] = useState("");
  const [full, setFull] = useState(false);
  const [collectorId, setCollectorId] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { collectors } = useCollectorContext();
  const collectorOptions = useMemo(() => {
    return collectors.map((c) => ({ label: c.name, _id: c._id }));
  }, []);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (input: any) =>
      await apiClient.post<{ message: string }>(`/history/create`, {
        ...input,
      }),
    {
      onSettled: () => {
        queryClient.refetchQueries("payment shops");
        setAmount("");
      },
    }
  );

  const handleChange = async (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <TableRow>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14 }}>
          {dayjs(payment.paymentDate).format("DD/MM/YYYY")}
        </Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14 }}> {payment.invoice}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14 }}>{payment.company.name}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14 }}>
          {currencyFormatter.format(payment.totalAmount, {})}
        </Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14 }}>
          {currencyFormatter.format(payment.dueAmount, {})}
        </Typography>
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <Autocomplete
            autoSelect
            options={collectorOptions}
            renderInput={(params) => (
              <TextField {...params} label="Collector" size="small" />
            )}
            onChange={(e, v) => setCollectorId(v?._id!)}
          />
        </FormControl>
      </TableCell>
      <TableCell>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box style={{ marginRight: 10, width: 200 }}>
            <DesktopDatePicker
              label="PaymentDate"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ mr: 1 }} size="small" />
              )}
            />
          </Box>
        </LocalizationProvider>
      </TableCell>
      <TableCell size="small">
        <Box display="flex" mt={1}>
          <TextField
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            sx={{ width: 100, fontSize: 14 }}
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
            sx={{ ml: 1, fontSize: 12 }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              mutate({
                payment: payment._id,
                amount: Number(amount),
                collector: collectorId,
                updateDate: date?.toISOString(),
              })
            }
          >
            update
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UpdateDue;
