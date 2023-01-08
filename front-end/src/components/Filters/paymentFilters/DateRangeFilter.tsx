import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Button from "@mui/material/Button";

const DateRangeFilter = () => {
  const [from, setFrom] = useState<Dayjs | null>(dayjs());
  const [to, setTo] = useState<Dayjs | null>(dayjs());

  const handleChangeFrom = (newValue: Dayjs | null) => {
    setFrom(newValue);
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setTo(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" mb={1}>
        <DesktopDatePicker
          label="From"
          inputFormat="MM/DD/YYYY"
          value={from}
          onChange={handleChangeFrom}
          renderInput={(params) => <TextField {...params} sx={{ mr: 1 }} />}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="MM/DD/YYYY"
          value={to}
          onChange={handleChangeTo}
          renderInput={(params) => <TextField {...params} sx={{ mr: 1 }} />}
        />
        <Button size="large" variant="contained">
          Fetch Payments
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
