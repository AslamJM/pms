import { apiClient } from "../../api/client";
import { useQuery } from "react-query";
import { mapObject } from "underscore";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
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

  const renderTable = () => {
    console.log(companies);

    if (data) {
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Paper sx={{ width: 600, my: 1, p: 1 }}>
        <Typography>payments for this month</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                companies.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{data[c.name]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CompanyPayments;
