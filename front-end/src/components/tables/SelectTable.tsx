import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { createPaymentData } from "./data";
import _, { omit } from "underscore";
import { useGlobalContext } from "../../context/GlobalContext";
import { useCollectorContext } from "../../context/CollectorContext";
import { IPayment, queryPayments } from "../../api/client";
import { useShopContext } from "../../context/ShopContext";
import { useQuery } from "react-query";
import { useCallback, useMemo, useState } from "react";
import { write, utils, writeFile } from "xlsx";
import { Box, Button, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs, { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import currencyFormatter from "currency-formatter";
import PaymentHistoryModal from "../../pages/reports/PaymenthistoryModal";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const PaymentTableSelect = () => {
  //report states
  const [payments, setAllPayments] = useState<IPayment[] | null>();
  const [params, setParams] = useState<any>({});

  //

  const [paymentId, setPaymentId] = useState("");
  const [pInvoice, setPInvoice] = useState("");
  const [ptotal, setPtotal] = useState(0);

  //for date picker
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  //

  //contexts
  const { companies, setAddModalOpen } = useGlobalContext();
  const { collectors } = useCollectorContext();
  const { shops } = useShopContext();
  //

  const areaNamesForFilter = useCallback(() => {
    return Array.from(new Set(shops.map((c) => c.region.name)));
  }, [shops]);

  const companyNamesForFilter = useCallback(() => {
    return companies.map((c) => c.name);
  }, [companies]);

  //column definitions for table
  const columns = useMemo<
    MRT_ColumnDef<ReturnType<typeof createPaymentData>>[]
  >(
    () => [
      { accessorKey: "paymentDate", header: "Invoice Date", maxSize: 6 },

      {
        accessorKey: "invoice",
        header: "Invoice",
        size: 50,
        Cell: ({ cell, row }) => {
          return (
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPaymentId(row.original._id);
                setPInvoice(row.original.invoice);
                setPtotal(row.original.totalAmount);
                setAddModalOpen(true);
              }}
            >
              {cell.getValue<string>()}
            </Link>
          );
        },
      },
      { accessorKey: "shop", header: "Shop", size: 50 },
      {
        accessorKey: "company",
        header: "Company",
        size: 50,
        filterVariant: "multi-select",
        filterSelectOptions: companyNamesForFilter(),
      },
      {
        accessorKey: "area",
        header: "Area",
        size: 50,
        filterVariant: "multi-select",
        filterSelectOptions: areaNamesForFilter(),
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("totalAmount"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },
      {
        accessorKey: "paidAmount",
        header: "Paid",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("paidAmount"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },
      {
        accessorKey: "dueAmount",
        header: "Due",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("dueAmount"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },
      { accessorKey: "lastPaid", header: "Credit Period", maxSize: 6 },
      {
        accessorKey: "paymentStatus",
        header: "Status",
        maxSize: 5,
        size: 30,
        filterVariant: "select",
        filterSelectOptions: ["PAID", "DUE"],
      },
      {
        accessorKey: "free",
        header: "Free",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("free"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },
      {
        accessorKey: "discount",
        header: "Discount",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("dueAmount"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },

      {
        accessorKey: "returnAmount",
        header: "Saleable",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("returnAmount"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },
      {
        accessorKey: "marketReturn",
        header: "Market",
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Typography component="p" variant="subtitle2">
            {currencyFormatter.format(cell.getValue<number>(), {})}
          </Typography>
        ),
        size: 50,
        enableColumnFilter: false,
        Footer: ({ table }) => (
          <Typography align="right" sx={{ fontSize: 14, fontWeight: "800" }}>
            {currencyFormatter.format(
              table
                .getFilteredRowModel()
                .rows.reduce(
                  (total, row) => total + row.getValue<number>("marketReturn"),
                  0
                ),
              {}
            )}
          </Typography>
        ),
      },

      {
        accessorKey: "collector",
        header: "Collector",
        maxSize: 5,
        filterVariant: "select",
        filterSelectOptions: collectors.map((c) => c.name),
      },
    ],
    [areaNamesForFilter, companyNamesForFilter]
  );
  //

  // rect query
  const { isLoading, refetch } = useQuery(
    ["all reports"],
    async () => await queryPayments(params),
    {
      enabled: false,
      onSuccess: (data) => {
        setAllPayments(data.payments);
        setFrom(null);
        setTo(null);
      },
    }
  );

  // util function for excelsheet download
  const downloadExcel = (paymentData: any) => {
    const workSheet = utils.json_to_sheet(paymentData);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "payments");

    const buff = write(workBook, { type: "buffer", bookType: "xlsx" });
    writeFile(workBook, "paymentData.xlsx");
  };
  //

  //function for pdf export
  const exportPdf = (cols: any, data: any) => {
    let colss = _.keys(data[0]).map((key, index) => ({
      header: cols[index],
      dataKey: key,
    }));

    let totalCol: Record<string, string | number> = _.mapObject(
      data[0],
      function (val, key) {
        if (typeof val === "number") {
          return 0;
        } else {
          return "";
        }
      }
    );

    let processedData = data.map((row: any) =>
      _.mapObject(row, function (val, key) {
        if (typeof val === "number") {
          totalCol[key] = (totalCol[key] as number) + val;
          return currencyFormatter.format(val, {});
        } else {
          return val;
        }
      })
    );

    const totalColRow = _.values(totalCol).map((val) =>
      typeof val === "number" ? currencyFormatter.format(val, {}) : val
    );

    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(15);
    doc.text("HS Enterprises Credit Payment", 100, 10);
    doc.setFontSize(12);
    doc.text(`Date - ${dayjs().format("DD/MM/YYYY")}`, 15, 15);
    doc.text(`Company - ${data[0].company}`, 15, 20);

    autoTable(doc, {
      body: processedData,
      columns: colss,
      foot: [totalColRow],
      margin: { top: 25 },
      styles: { cellPadding: 1, fontSize: 10 },
    });

    doc.save(`table-${dayjs().format("DD/MM/YYYY")}.pdf`);
  };
  //

  //date picker utils functions
  const handleChangeFrom = (newValue: Dayjs | null) => {
    setFrom(newValue?.toISOString()!);
    setParams((params: any) => ({ ...params, from: newValue?.toISOString()! }));
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setTo(newValue?.toISOString()!);
    setParams((params: any) => ({ ...params, to: newValue?.toISOString()! }));
  };
  //

  return (
    <>
    
      <PaymentHistoryModal
        paymentId={paymentId}
        invoice={pInvoice}
        total={ptotal}
      />
      {/*filters with date range*/}
      <Typography sx={{ mb: 1, fontFamily: 'Poppins' }}>Select a Date Range to Fetch Data</Typography>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" alignItems="flex-end" mb={2} >
          <DesktopDatePicker
            label="From"
            inputFormat="DD/MM/YYYY"
            value={from}
            onChange={handleChangeFrom}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: 1 }} size="small" />
            )}
          />
          <DesktopDatePicker
            label="To"
            inputFormat="DD/MM/YYYY"
            value={to}
            onChange={handleChangeTo}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: 1 }} size="small" />
            )}
          />
          <Button
            variant="contained"
            onClick={() => {
              refetch();
              setParams({ from, to });
            }}
            disabled={!from || !to}
          >
            {isLoading ? "Fetching...." : "Fetch Payments"}
          </Button>
        </Box>
      </LocalizationProvider>
      {/******************************/}
      <Paper sx={{ width: 1195, my: 1, p: 1, boxShadow: 5, fontFamily: 'Poppins', borderRadius: '8px' }}>
      <TableContainer style={{ maxHeight: 600 }}>
      <MaterialReactTable
        columns={columns}
        data={payments ? payments.map((d) => createPaymentData(d)) : []}
        state={{ isLoading }}
        initialState={{ showColumnFilters: true }}
        enableRowSelection
        muiTableBodyProps={{
          sx: {
            "& tr:nth-of-type(even)": {
              backgroundColor: "#ADADC9",width: "100%"
            },
          },
        }}
        //top tool bar actions
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap", }}>
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
            <Button
              color="primary"
              disabled={!table.getIsSomeRowsSelected}
              startIcon={<PictureAsPdfIcon />}
              variant="outlined"
              onClick={() => {
                let cols = table
                  .getVisibleFlatColumns()
                  .map((c) => c.columnDef.header)
                  .filter((c) => c !== "Select") as string[];

                let rows = table
                  .getSelectedRowModel()
                  .rows.map((r) => omit(r.original, "_id"));

                exportPdf(cols, rows);
              }}
            >
              export pdf
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                table.resetColumnFilters();
              }}
            >
              reset filters
            </Button>
          </Box>
        )}
      />
      </TableContainer>
      </Paper>
    </>
  );
};

export default PaymentTableSelect;
