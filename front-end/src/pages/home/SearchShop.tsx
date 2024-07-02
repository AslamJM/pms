import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useShopContext } from "../../context/ShopContext";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import { IPayment, queryPayments } from "../../api/client";
import { CircularProgress, Grid, Paper, Table, Box } from "@mui/material";
import UpdateDue from "./UpdateDue";
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const SearchShop = () => {
  const [shop, setShop] = useState<string | null>(null);
  const [payments, setPayments] = useState<IPayment[]>([]);

  const { shops } = useShopContext();
  const shopOptions = shops.map((s) => ({ label: s.name, _id: s._id }));

  const { isLoading, refetch } = useQuery(
    "Payment Shops",
    async () => await queryPayments({ shop, paymentStatus: "DUE" }),
    {
      enabled: false,
      onSuccess: (data) => {
        setPayments(data.payments);
      },
    }
  );

  return (
    <div style={{ overflow: "hidden", flexGrow: 1, fontFamily: 'Poppins' }}>
      <div style={{ display: "flex", padding: 10 }}>
        <Autocomplete
          autoSelect
          options={shopOptions}
          fullWidth
          sx={{ mx: 1, fontFamily: 'Poppins' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search the shop name"
              size="small"
              fullWidth
              InputLabelProps={{
                style: { fontFamily: 'Poppins, sans-serif' }
              }}
            />
          )}
          onChange={(e, v) => setShop(v?._id!)}
        />
        <div>
          <Button
            variant="contained"
            disabled={!shop}
            onClick={() => refetch()}
            sx={{ fontFamily: 'Poppins' }}
          >
            {isLoading ? <CircularProgress /> : "search"}
          </Button>
        </div>
      </div>
      <div style={{ padding: "0 20px 0 20px" }}>
      <Paper sx={{ width: 750, my: 1, p: 1, boxShadow: 5, fontFamily: 'Poppins', borderRadius: '8px' }}>
        <TableContainer style={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Invoice Date",
                  "Invoice",
                  "Company",
                  "Total",
                  "Due",
                  "Collector",
                  "Date",
                  "Amount",
                  "Action",
                ].map((item) => (
                  <TableCell key={item} sx={{ fontFamily: 'Poppins' }}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
            {shop && payments.length > 0 ? (
              payments.map((p) => (
                <UpdateDue payment={p} key={p._id} />
              ))
            ) : shop && payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="center" style={{ fontFamily: 'Poppins', color: "grey" }}>
                    This shop has no due payments.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="left" style={{ fontFamily: 'Poppins', color: "grey" }}>
                    Search for a shop name to find due payments.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Table>
          </TableContainer>
      </Paper>
      </div>
    </div>
  );
};

export default SearchShop;
