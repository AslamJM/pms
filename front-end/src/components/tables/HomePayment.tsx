import { Paper, TableBody, TableCell, TableContainer, Typography, Table } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import UpdateDue from "../../pages/home/UpdateDue";
import { useState } from 'react';
import { apiClient, IPayment } from '../../api/client';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../context/GlobalContext';
import currencyFormatter from 'currency-formatter';

const HomePayment = () => {
    const getCompanyPayment = async () =>
        (await apiClient.get<Record<string, number>>("/payments/company-income"))
          .data;
    
      const { data, isLoading, isError } = useQuery(
        "company-income",
        getCompanyPayment
      );
    
      const { companies } = useGlobalContext();
    
      if (isLoading) {
        return <div>Fetching company data.....</div>;
      }
    
      if (isError) {
        return <div>Error Fetching Data</div>;
      }

      const sortedCompanies = companies.sort((a, b) => {
        const dataOrDefault = data ?? {};
        const dueDateA = new Date(dataOrDefault[a.name]);
        const dueDateB = new Date(dataOrDefault[b.name]);
        return dueDateA.getTime() - dueDateB.getTime();
      });

    return (
        <Paper sx={{ width: 500, my: 1, p: 1, boxShadow: 5, mt: 2, ml: 3, borderRadius: '10px' }}>
            <TableContainer style={{ maxHeight: 500 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold'}}>Company</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} align="center">Due Payment</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {sortedCompanies.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                {data && (
  <TableCell align="center">
    {currencyFormatter.format(data[c.name], {})}
  </TableCell>
)}

{data && (
  <TableCell align="right">{c.name in data ? new Date(data[c.name]).toLocaleDateString() : 'No due date'}</TableCell>
)}
              </TableRow>
            ))}
          </TableBody>
                 </Table>
            </TableContainer>
        </Paper>
    );
};
export default HomePayment;