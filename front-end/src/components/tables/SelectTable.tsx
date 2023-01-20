import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { createPaymentData } from "./data";
import _ from "underscore";
import { useGlobalContext } from "../../context/GlobalContext";
import { useCollectorContext } from "../../context/CollectorContext";
import { queryPayments } from "../../api/client";
import { usePaymentContext } from "../../context/PaymentContext";
import { useQuery } from "react-query";
import { useEffect, useMemo } from "react";
import { write, utils, writeFile } from "xlsx";
import { Box, Button } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";

const PaymentTableSelect = () => {
  const { params, companies } = useGlobalContext();
  const { setSelectedPayment, payments, setAllPayments } = usePaymentContext();
  const { collectors } = useCollectorContext();

  const columns = useMemo<
    MRT_ColumnDef<ReturnType<typeof createPaymentData>>[]
  >(
    () => [
      { accessorKey: "invoice", header: "Invoice", size: 50 },
      { accessorKey: "shop", header: "Shop", size: 50 },
      {
        accessorKey: "company",
        header: "Company",
        size: 50,
        filterVariant: "multi-select",
        filterSelectOptions: companies.map((c) => c.name),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "free",
        header: "Free",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "paidAmount",
        header: "paid",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "returnAmount",
        header: "return",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "marketReturn",
        header: "market",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "dueAmount",
        header: "due",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        size: 50,
        enableColumnFilter: false,
      },
      {
        accessorKey: "paymentStatus",
        header: "Status",
        maxSize: 5,
        size: 30,
        filterVariant: "select",
        filterSelectOptions: ["PAID", "DUE"],
      },
      {
        accessorKey: "collector",
        header: "Collector",
        maxSize: 5,
        filterVariant: "select",
        filterSelectOptions: collectors.map((c) => c.name),
      },
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

  const downloadExcel = (paymentData: any) => {
    const workSheet = utils.json_to_sheet(paymentData);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "payments");

    const buff = write(workBook, { type: "buffer", bookType: "xlsx" });
    writeFile(workBook, "paymentData.xlsx");
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <MaterialReactTable
      columns={columns}
      data={payments ? payments.map((d) => createPaymentData(d)) : []}
      state={{ isLoading }}
      initialState={{ showColumnFilters: true }}
      enableRowSelection
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
        >
          <Button
            color="primary"
            disabled={!table.getIsSomeRowsSelected}
            onClick={() => {
              let cols = table.getVisibleFlatColumns().map((c) => ({
                id: c.id,
                header: c.columnDef.header as string,
              }));

              let rows = table
                .getSelectedRowModel()
                .rows.map((r) => r.original);

              const data = rows.map((row) => {
                let obj: any = {};
                cols.map((col) => {
                  obj[col.header] = row[col.id as keyof typeof row];
                });
                return obj;
              });

              downloadExcel(data);
            }}
            startIcon={<GridOnIcon />}
            variant="outlined"
          >
            Export to Excel
          </Button>
        </Box>
      )}
    />
  );
};

export default PaymentTableSelect;
