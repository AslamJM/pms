import { useEffect, useState } from "react";
import CustomTable, { IColumn } from "../../components/tables/Table";
import { paymentClient } from "../../api/payments";
import CircularLoader from "../../components/loader/CircularLoader";
import { useQuery } from "react-query";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPayment } from "../../api/client";
import dayjs from "dayjs";
import DeletePaymentModel from "./modals/DeletePaymentModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { queryPayments } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";

const columns: IColumn[] = [
  { id: "invoice", label: "Invoice" },
  { id: "shop", label: "Shop" },
  { id: "amount", label: "Amount" },
  { id: "free", label: "Free" },
  { id: "discount", label: "Discount" },
  { id: "paidAmount", label: "paid" },
  { id: "returnAmount", label: "return" },
  { id: "dueAmount", label: "due" },
  { id: "paymentStatus", label: "Status" },
  { id: "collector", label: "Collector" },
  { id: "paymentDate", label: "Payment Date" },
  { id: "dueDate", label: "Due Date" },
];

function createPaymentData(payment: IPayment) {
  const {
    invoice,
    shop,
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    dueAmount,
    paymentStatus,
    company,
    dueDate,
    paymentDate,
    collector,
  } = payment;
  return {
    invoice,
    shop: shop.name,
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    dueAmount,
    paymentStatus,
    company: company.name,
    collector: collector.name,
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    dueDate: dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}

const PaymentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { setDeleteModalOpen, params } = useGlobalContext();
  const { setSelectedPayment, payments, setAllPayments } = usePaymentContext();

  const { getAllpayments } = paymentClient;
  const { data, isLoading, isError, refetch } = useQuery(
    "all payments",
    async () => await queryPayments(params),
    {
      onSuccess: (data) => setAllPayments(data.payments),
    }
  );

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <CircularLoader />;
  }

  if (isError) {
    return <div>an error occurred</div>;
  }

  if (payments && payments.length === 0) {
    return (
      <Box>
        <Typography variant="h3" color="GrayText" align="center">
          You have no payments to display
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <DeletePaymentModel />
      <CustomTable
        columns={columns}
        count={0}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {payments
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
                      setSelectedPayment(rowPayment);
                      setDeleteModalOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
      </CustomTable>
    </>
  );
};

export default PaymentTable;
