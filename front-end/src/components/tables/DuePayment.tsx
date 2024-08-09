import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CircularLoader from "../../components/loader/CircularLoader";
import { IPayment, queryPayments } from "../../api/client";

export const DuePayment = () => {
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

  return (
    <Box mt={5}>
      {payments.length === 0 ? (
        <Typography color="GrayText" align="center">
          No payments available.
        </Typography>
      ) : (
        payments.map((payment) => (
          <Box key={payment._id} mb={2}>
            <Typography variant="h6">
              Shop: {payment.shop?.name || "Unknown Shop"}
            </Typography>
            <Typography>
              Due Amount: {payment.dueAmount.toFixed(2)}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default DuePayment;
