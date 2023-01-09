import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { getPaymentsForDate, IPayment } from "../../../api/client";
import { useQuery, useQueryClient } from "react-query";
import { useGlobalContext } from "../../../context/GlobalContext";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useState } from "react";

const PaymentDateFilter = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  //const { setAllPayments } = usePaymentContext();
  const { setParams } = useGlobalContext();

  const queryClient = useQueryClient();

  const handleChange = async (newValue: Dayjs | null) => {
    setDate(newValue);
    // const data = await queryClient.fetchQuery(
    //   "get payments of date",
    //   async () => await getPaymentsForDate({ date: dayjs(date).toISOString() })
    // );
    // console.log(data);

    // setAllPayments(data.payments);

    console.log(dayjs(newValue).toISOString());

    setParams({ paymentDate: dayjs(newValue).toISOString() });
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
