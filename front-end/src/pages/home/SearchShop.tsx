import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useShopContext } from "../../context/ShopContext";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import { IPayment, queryPayments } from "../../api/client";
import { CircularProgress, Grid, Table } from "@mui/material";
import UpdateDue from "./UpdateDue";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const SearchShop = () => {
  const [shop, setShop] = useState<string | null>(null);
  const [payments, setPayments] = useState<IPayment[]>([]);

  const { shops } = useShopContext();
  const shopOptions = shops.map((s) => ({ label: s.name, _id: s._id }));

  const { isLoading, refetch } = useQuery(
    "payment shops",
    async () => await queryPayments({ shop, paymentStatus: "DUE" }),
    {
      enabled: false,
      onSuccess: (data) => {
        setPayments(data.payments);
      },
    }
  );

  return (
    <div style={{ overflow: "hidden", flexGrow: 1 }}>
      <div style={{ display: "flex", padding: 10 }}>
        <Autocomplete
          autoSelect
          options={shopOptions}
          fullWidth
          sx={{ mx: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search the shop name"
              size="small"
              fullWidth
            />
          )}
          onChange={(e, v) => setShop(v?._id!)}
        />
        <div>
          <Button
            variant="contained"
            disabled={!shop}
            onClick={() => refetch()}
          >
            {isLoading ? <CircularProgress /> : "search"}
          </Button>
        </div>
      </div>
      <div style={{ padding: "0 20px 0 20px" }}>
        {shop && payments.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                {[
                  "Invoice",
                  "Company",
                  "Total",
                  "Due",
                  "Collector",
                  "Date",
                  "Action",
                ].map((item) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((p) => (
                <UpdateDue payment={p} key={p._id} />
              ))}
            </TableBody>
          </Table>
        ) : shop && payments.length === 0 ? (
          <Typography component="i" align="center">
            This shop has no due payments.
          </Typography>
        ) : (
          <Typography component="i" align="center">
            Search for a shop name to find due payments.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SearchShop;
