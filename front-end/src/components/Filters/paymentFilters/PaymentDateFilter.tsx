import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useState } from "react";

const PaymentDateFilter = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { setParams } = useGlobalContext();

  const handleChange = async (newValue: Dayjs | null) => {
    setDate(newValue);
    setParams({ paymentDate: dayjs(newValue).toISOString() });
  };

  return (
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
  );
};

export default PaymentDateFilter;
