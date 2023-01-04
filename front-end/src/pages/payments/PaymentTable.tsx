import { useState } from "react";
import CustomTable, { IColumn } from "../../components/tables/Table";
import { paymentClient } from "../../api/payments";
import CircularLoader from "../../components/loader/CircularLoader";
import { useQuery } from "react-query";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPayment } from "../../api/client";
import dayjs from "dayjs";

const columns: IColumn[] = [
  { id: "shop", label: "Shop" },
  { id: "amount", label: "Amount" },
  { id: "dueAmount", label: "due" },
  { id: "paymentStatus", label: "Status" },
  { id: "collector", label: "Collector" },
  { id: "paymentDate", label: "Payment Date" },
  { id: "dueDate", label: "Due Date" },
];

function createPaymentData(payment: IPayment) {
  const {
    shop,
    amount,
    dueAmount,
    paymentStatus,
    dueDate,
    paymentDate,
    collector,
  } = payment;
  return {
    shop: shop.name,
    amount,
    dueAmount,
    paymentStatus,
    collector: collector.name,
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    dueDate: dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}

const PaymentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getAllpayments } = paymentClient;
  const { data, isLoading, isError } = useQuery("all payments", getAllpayments);

  if (isLoading) {
    return <CircularLoader />;
  }

  if (isError) {
    return <div>an error occurred</div>;
  }

  if (data?.payments && data?.payments.length === 0) {
    return (
      <Box>
        <Typography variant="h3" color="GrayText" align="center">
          You have no payments to display
        </Typography>
      </Box>
    );
  }

  return (
    <CustomTable
      columns={columns}
      count={0}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
    >
      {data?.payments
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((rowPayment, setkey) => {
          const row = createPaymentData(rowPayment);
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={setkey}>
              {columns.map((col, index) => {
                return (
                  <TableCell key={index} align={col.align}>
                    {row[col.id as keyof Omit<typeof row, "_id">]}
                  </TableCell>
                );
              })}
              <TableCell>
                <BorderColorIcon
                  color="success"
                  sx={{
                    cursor: "pointer",
                  }}
                  fontSize="medium"
                />
              </TableCell>
              <TableCell>
                <DeleteIcon
                  color="error"
                  sx={{ cursor: "pointer" }}
                  fontSize="medium"
                  onClick={() => {
                    //setSelectedShop(row);
                    //setDeleteModalOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
    </CustomTable>
  );
};

export default PaymentTable;
