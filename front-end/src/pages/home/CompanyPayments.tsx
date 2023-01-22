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
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

const CompanyPayments = () => {
  const getCompanyIncome = async () =>
    (await apiClient.get<Record<string, number>>("/payments/company-income"))
      .data;

  const { data, isLoading, isError } = useQuery(
    "company-income",
    getCompanyIncome
  );
  if (isLoading) {
    return <div>Fetching company data.....</div>;
  }

  if (isError) {
    return <div>Error Fetching Data</div>;
  }

  const renderTable = () => {
    if (data) {
      mapObject(data, (v, k) => {
        return (
          <TableBody>
            <TableRow>
              <TableCell>{k}</TableCell>
              <TableCell>{v}</TableCell>
            </TableRow>
          </TableBody>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Paper sx={{ width: 600, my: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>company</TableCell>
                <TableCell>amount</TableCell>
              </TableRow>
            </TableHead>
            {renderTable()}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CompanyPayments;
