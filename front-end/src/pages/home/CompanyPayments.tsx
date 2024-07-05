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
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';

const CompanyPayments = () => {
  const getCompanyIncome = async () =>
    (await apiClient.get<Record<string, number>>("/payments/company-income"))
      .data;

  const { data, isLoading, isError } = useQuery(
    "company-income",
    getCompanyIncome
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Roboto:400,700',
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Merriweather:400,700',
          'Playfair Display:400,700',
          'Poppins:400,700'
        ]
      }
    });
  }, []);

  const { companies } = useGlobalContext();

  if (isLoading) {
    return <div>Fetching company data.....</div>;
  }

  if (isError) {
    return <div>Error Fetching Data</div>;
  }

  return (
    <Paper sx={{ width: 400, my: 1, p: 1, boxShadow: 5, borderRadius: '10px' }}>
      <Typography align="center" mt={1} mb={1} sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Payments Collections For This Month</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#BB892D", color: "white"}}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: 'bold', fontFamily: 'Lato'}}>Company</TableCell>
              <TableCell sx={{color: "white", fontWeight: 'bold', fontFamily: 'Lato'}} align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              companies.map((c) => (
                <TableRow key={c._id}>
                  <TableCell sx={{ fontFamily: 'Poppins'}}>{c.name}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'Poppins'}}>
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
