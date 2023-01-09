import { useEffect, useState } from "react";
import CustomTable, { IColumn } from "../../components/tables/Table";
import CircularLoader from "../../components/loader/CircularLoader";
import { useQuery } from "react-query";
import {
  Box,
  Chip,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { apiClient, IPayment } from "../../api/client";
import dayjs from "dayjs";
import DeletePaymentModel from "./modals/DeletePaymentModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { queryPayments } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";
import IconButton from "@mui/material/IconButton";

const columns: IColumn[] = [
  { id: "invoice", label: "Invoice", maxWidth: 6 },
  { id: "shop", label: "Shop" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "free", label: "Free", align: "right" },
  { id: "discount", label: "Discount", align: "right" },
  { id: "paidAmount", label: "paid", align: "right" },
  { id: "returnAmount", label: "return", align: "right" },
  { id: "dueAmount", label: "due", align: "right" },
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

  const { data, isLoading, isError, refetch } = useQuery(
    "all payments",
    async () => await queryPayments(params),
    {
      onSuccess: (data) => setAllPayments(data.payments),
    }
  );

  const verifyPayment = async (id: string) =>
    await apiClient.get<{ message: string }>(`/payments/verify/${id}`);

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
      <Box mt={1}>
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
                  if (col.id === "paymentStatus") {
                    return (
                      <TableCell
                        key={index}
                        align={col.align}
                        width={col.maxWidth}
                      >
                        <Chip
                          label={row.paymentStatus}
                          color={
                            row.paymentStatus === "DUE"
                              ? "error"
                              : row.paymentStatus === "PAID"
                              ? "success"
                              : "secondary"
                          }
                          size="small"
                        />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={index}
                      align={col.align}
                      width={col.maxWidth}
                    >
                      {row[col.id as keyof Omit<typeof row, "_id">]}
                    </TableCell>
                  );
                })}

                {rowPayment.verified === true ? (
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label="verified"
                      color="success"
                      variant="filled"
                      size="small"
                    />
                    <Box display="flex" alignItems="center">
                      <Tooltip title="edit">
                        <IconButton>
                          <BorderColorIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="delete">
                        <IconButton
                          onClick={() => {
                            setSelectedPayment(rowPayment);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <ClearIcon color="error" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Tooltip title="edit">
                      <IconButton>
                        <BorderColorIcon color="primary" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="delete">
                      <IconButton
                        onClick={() => {
                          setSelectedPayment(rowPayment);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <ClearIcon color="error" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="verify">
                      <IconButton
                        onClick={async () => {
                          await verifyPayment(rowPayment._id);
                          await refetch();
                        }}
                      >
                        <CheckIcon color="success" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </CustomTable>
    </>
  );
};

export default PaymentTable;
