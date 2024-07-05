import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import Button from "@mui/material/Button";

const DateRangeFilter = () => {
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);

  const { setParams } = useGlobalContext();

  const handleChangeFrom = (newValue: Dayjs | null) => {
    setFrom(newValue);
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setTo(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="flex-end" >
        <DesktopDatePicker
          label="From"
          inputFormat="DD/MM/YYYY"
          value={from}
          onChange={handleChangeFrom}
          renderInput={(params) => (
            <TextField {...params} sx={{ mr: 2, width: 244 }} size="small" />
          )}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="DD/MM/YYYY"
          value={to}
          onChange={handleChangeTo}
          renderInput={(params) => (
            <TextField {...params} sx={{ mr: 1, width: 244 }} size="small" />
          )}
        />
        <Button
          variant="contained"
          onClick={() => {
            setParams({ from, to });
            setFrom(null);
            setTo(null);
          }}
          disabled={!from || !to}
          sx={{ ml: 1, mr: 1.5, width: 243 }}
        >
          Fetch Payments
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
