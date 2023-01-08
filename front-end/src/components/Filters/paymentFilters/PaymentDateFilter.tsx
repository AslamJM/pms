import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { getPaymentsForDate } from "../../../api/client";
import { useQuery } from "react-query";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useState } from "react";

const PaymentDateFilter = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { setAllPayments } = usePaymentContext();
  const {} = useQuery("get payments of date", async (params) =>
    getPaymentsForDate(params)
  );

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    console.log(dayjs(date).startOf("D").toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box style={{ flexGrow: 1, marginRight: 10 }}>
        <DesktopDatePicker
          label="PaymentDate"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} sx={{ mr: 1 }} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PaymentDateFilter;
