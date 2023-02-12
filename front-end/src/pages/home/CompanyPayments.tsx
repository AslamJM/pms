import { apiClient } from "../../api/client";
import { useQuery } from "react-query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import currencyFormatter from "currency-formatter";
import TableContainer from "@mui/material/TableContainer";
import { useGlobalContext } from "../../context/GlobalContext";
const CompanyPayments = () => {
  const getCompanyIncome = async () =>
    (await apiClient.get<Record<string, number>>("/payments/company-income"))
      .data;

  const { data, isLoading, isError } = useQuery(
    "company-income",
    getCompanyIncome
  );

  const { companies } = useGlobalContext();

  if (isLoading) {
    return <div>Fetching company data.....</div>;
  }

  if (isError) {
    return <div>Error Fetching Data</div>;
  }

  return (
    <Paper sx={{ width: 400, my: 1, p: 1 }}>
      <Typography>Payments collections for this month</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#BB892D" }}>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              companies.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell align="right">
                    {currencyFormatter.format(data[c.name], {})}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CompanyPayments;
