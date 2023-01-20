import { useEffect, useState } from "react";
import { IColumn } from "../../components/tables/Table";
import PaymnentTableContainer from "../../components/tables/PaymentTableContainer";
import CircularLoader from "../../components/loader/CircularLoader";
import { useQuery } from "react-query";
import {
  Box,
  Chip,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  Checkbox,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { apiClient, IPayment } from "../../api/client";
import dayjs from "dayjs";
import DeletePaymentModel from "./modals/DeletePaymentModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { queryPayments } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";
import { calculateLastDays } from "../../components/tables/data";
import IconButton from "@mui/material/IconButton";

const columns: IColumn[] = [
  { id: "invoice", label: "Invoice", maxWidth: 6 },
  { id: "shop", label: "Shop" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "free", label: "Free", align: "right" },
  { id: "discount", label: "Discount", align: "right" },
  { id: "paidAmount", label: "paid", align: "right" },
  { id: "returnAmount", label: "return", align: "right" },
  { id: "marketReturn", label: "market", align: "right" },
  { id: "dueAmount", label: "due", align: "right" },
  { id: "paymentStatus", label: "Status" },
  { id: "collector", label: "Collector" },
  { id: "paymentDate", label: "Payment Date" },
  //{ id: "dueDate", label: "Due Date" },
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
    marketReturn,
    dueAmount,
    paymentStatus,
    company,
    dueDate,
    paymentDate,
    collector,
  } = payment;
  return {
    invoice,
    shop: shop ? shop.name : "-",
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    marketReturn,
    dueAmount,
    paymentStatus,
    company: company ? company.name : "-",
    collector: collector ? collector.name : "-",
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    dueDate: dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}

const PaymentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { setDeleteModalOpen, params, setEditModalOpen } = useGlobalContext();
  const { user } = useAuthContext();
  const {
    setSelectedPayment,
    payments,
    setAllPayments,
    checkedPayments,
    setCheckedPayments,
  } = usePaymentContext();

  const { data, isLoading, isError, refetch } = useQuery(
    "all payments",
    async () => await queryPayments(params),
    {
      onSuccess: (data) => setAllPayments(data.payments),
    }
  );

  const verifyPayment = async (id: string) =>
    await apiClient.get<{ message: string }>(`/payments/verify/${id}`);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedPayments(payments.map((p) => p._id));
      return;
    }
    setCheckedPayments([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = checkedPayments.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checkedPayments, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checkedPayments.slice(1));
    } else if (selectedIndex === checkedPayments.length - 1) {
      newSelected = newSelected.concat(checkedPayments.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checkedPayments.slice(0, selectedIndex),
        checkedPayments.slice(selectedIndex + 1)
      );
    }

    setCheckedPayments(newSelected);
  };

  const isSelected = (name: string) => checkedPayments.indexOf(name) !== -1;

  console.log(checkedPayments);

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
      <Box mt={5}>
        <Typography variant="h5" color="GrayText" align="center">
          You have no payments to display
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <DeletePaymentModel />
      <PaymnentTableContainer
        columns={columns}
        count={payments.length}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        onSelectAllClick={handleSelectAllClick}
        numSelected={checkedPayments.length}
      >
        {payments
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((rowPayment, setkey) => {
            const row = createPaymentData(rowPayment);
            const isItemSelected = isSelected(rowPayment._id);
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={setkey}
                style={
                  setkey % 2
                    ? { background: "#f2752730" }
                    : { background: "white" }
                }
              >
                <TableCell>
                  <Checkbox
                    checked={isItemSelected}
                    onClick={(event) => handleClick(event, rowPayment._id)}
                  />
                </TableCell>
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
                <TableCell>{calculateLastDays(rowPayment)}</TableCell>

                {user?.role === "ADMIN" && rowPayment.verified === true ? (
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
                        <IconButton
                          onClick={() => {
                            setSelectedPayment(rowPayment);
                            setEditModalOpen(true);
                          }}
                        >
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
                ) : user?.role === "ADMIN" ? (
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Tooltip title="edit">
                      <IconButton
                        onClick={() => {
                          setSelectedPayment(rowPayment);
                          setEditModalOpen(true);
                        }}
                      >
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
                ) : (
                  <></>
                )}
              </TableRow>
            );
          })}
      </PaymnentTableContainer>
    </>
  );
};

export default PaymentTable;
