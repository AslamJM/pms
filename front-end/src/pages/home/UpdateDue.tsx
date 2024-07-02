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
        <Typography sx={{ fontSize: 14, fontFamily: 'Poppins' }}> {payment.invoice}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14, fontFamily: 'Poppins' }}>{payment.company.name}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14, fontFamily: 'Poppins' }}>
          {currencyFormatter.format(payment.totalAmount, {})}
        </Typography>
      </TableCell>
      <TableCell size="small">
        <Typography sx={{ fontSize: 14, fontFamily: 'Poppins' }}>
          {currencyFormatter.format(payment.dueAmount, {})}
        </Typography>
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <Autocomplete
            autoSelect
            options={collectorOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Collector" size="small" style={{ width: '150px' }} InputLabelProps={{
                style: { fontFamily: 'Poppins, sans-serif' }
              }}/>
            )}
            onChange={(e, v) => setCollectorId(v?._id!)}
            sx={{ fontFamily: 'Poppins, sans-serif',
              '& .MuiInputBase-option': {
                fontFamily: 'Poppins, sans-serif',
              },
            }}
          />
        </FormControl>
      </TableCell>
      <TableCell>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box style={{ marginRight: 10, width: 200, fontFamily: 'Poppins' }}>
            <DesktopDatePicker
              label="Payment Date"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  size="small" 
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }} 
                  sx={{
                    mr: 1, 
                    fontFamily: 'Poppins, sans-serif',
                    '& .MuiInputBase-input': {
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                />
              )}
            />
          </Box>
        </LocalizationProvider>
      </TableCell>
      <TableCell size="small">
        <Box display="flex" mt={1} sx={{ alignItems: "center" }}>
          <TextField
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            sx={{ width: 100, fontSize: 14, fontFamily: 'Poppins, sans-serif',
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins, sans-serif',
              },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Poppins, sans-serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins, sans-serif',
              },
            }}
            InputLabelProps={{
              style: { fontFamily: 'Poppins, sans-serif' }
            }}
          />
        </Box>
      </TableCell>
      <TableCell size="small">
        <Box display="flex" mt={1} sx={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                value={full}
                onChange={() => {
                  setFull(true);
                  setAmount(payment.dueAmount.toString());
                }}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            }
            label="Full"
            sx={{ fontSize: 12 }}
          />
          <Button
            variant="contained"
            size="small"
            style={{ alignContent: 'center' }}
            onClick={() =>
              mutate({
                payment: payment._id,
                amount: Number(amount),
                collector: collectorId,
                updateDate: date?.toISOString(),
              })
            }
          >
            Update
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UpdateDue;
