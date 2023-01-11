import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { apiClient, IPayment } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

export default function InvoiceSearch() {
  const [search, setSearch] = useState("");

  const { selectedPayment, setSelectedPayment } = usePaymentContext();

  const getPaymnent = async () => {
    const response = await apiClient.get<{ payment: IPayment }>(
      "/payments/invoice",
      {
        params: { invoice: search },
      }
    );
    if (response.status === 200) {
      setSelectedPayment(response.data.payment);
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        flexGrow: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flexShrink: 1 }}
        placeholder="Search invoice number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        onClick={() => getPaymnent()}
      >
        <SearchIcon color="primary" />
      </IconButton>
      <Typography sx={{ ml: 2 }}>
        {selectedPayment
          ? selectedPayment.invoice + " - " + selectedPayment.shop.name
          : "search an invoice"}
      </Typography>
    </Paper>
  );
}
