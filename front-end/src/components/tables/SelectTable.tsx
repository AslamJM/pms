import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { IPayment } from "../../api/client";
import { createPaymentData } from "./data";
import { useGlobalContext } from "../../context/GlobalContext";
import { queryPayments } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";
import { useQuery } from "react-query";
import { useMemo } from "react";

const PaymentTableSelect = () => {
  const { setDeleteModalOpen, params, setEditModalOpen } = useGlobalContext();
  const { setSelectedPayment, payments, setAllPayments } = usePaymentContext();

  const columns = useMemo<
    MRT_ColumnDef<ReturnType<typeof createPaymentData>>[]
  >(
    () => [
      { accessorKey: "invoice", header: "Invoice", maxSize: 5 },
      { accessorKey: "shop", header: "Shop", maxSize: 5 },
      { accessorKey: "amount", header: "Amount", maxSize: 5 },
      { accessorKey: "free", header: "Free", maxSize: 5 },
      { accessorKey: "discount", header: "Discount", maxSize: 5 },
      { accessorKey: "paidAmount", header: "paid", maxSize: 5 },
      { accessorKey: "returnAmount", header: "return", maxSize: 5 },
      { accessorKey: "dueAmount", header: "due", maxSize: 5 },
      { accessorKey: "paymentStatus", header: "Status", maxSize: 5 },
      { accessorKey: "collector", header: "Collector", maxSize: 5 },
      { accessorKey: "paymentDate", header: "Payment Date", maxSize: 6 },
    ],
    []
  );

  const { data, isLoading, isError, refetch } = useQuery(
    "all payments",
    async () => await queryPayments(params),
    {
      onSuccess: (data) => setAllPayments(data.payments),
    }
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={payments ? payments.map((d) => createPaymentData(d)) : []}
      state={{ isLoading }}
      enableEditing
    />
  );
};

export default PaymentTableSelect;
