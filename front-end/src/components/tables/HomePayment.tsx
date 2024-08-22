import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Table,
} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import CircularLoader from "../../components/loader/CircularLoader";
import { IPayment, queryPayments } from "../../api/client";

const HomePayment = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await queryPayments({});
        setPayments(response.payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (isLoading) {
    return <CircularLoader />;
  }

  if (isError) {
    return <div>An error occurred while fetching payments.</div>;
  }

  if (payments.length === 0) {
    return <div>No due payments</div>;
  }

  // Sort payments by dueDate (ascending) and move paid payments to the bottom
  const sortedPayments = payments.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    // If both due amounts are 0 (paid), retain original order
    if (a.dueAmount === 0 && b.dueAmount === 0) return 0;

    // If only one due amount is 0 (paid), move it to the bottom
    if (a.dueAmount === 0) return 1;
    if (b.dueAmount === 0) return -1;

    // Otherwise, sort by dueDate
    return dateA.getTime() - dateB.getTime();
  });

  const currentDate = new Date();

  return (
    <Paper
      sx={{
        width: "75%",
        my: 1,
        p: 1,
        boxShadow: 5,
        mt: 2,
        ml: 3,
        borderRadius: "10px",
      }}
    >
      <Typography
        align="center"
        mt={1}
        mb={1}
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Due Collections For This Month
      </Typography>
      <TableContainer style={{ maxHeight: 500 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#BB892D", color: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Shop
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white" }}
                align="center"
              >
                Due Payment
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white" }}
                align="right"
              >
                Due Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="GrayText">
                    No payments available.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedPayments.map((payment) => {
                const dueDate = new Date(payment.dueDate);
                const isPastDue =
                  dueDate < currentDate && payment.dueAmount > 0;

                return (
                  <TableRow key={payment._id}>
                    <TableCell>
                      {payment.shop?.name || "Unknown Shop"}
                    </TableCell>
                    <TableCell align="center">
                      {payment.dueAmount?.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: isPastDue ? "red" : "inherit" }}
                    >
                      {payment.dueAmount
                        ? dueDate.toLocaleDateString()
                        : "Due Finished"}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HomePayment;
