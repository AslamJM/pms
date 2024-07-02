import Paper from "@mui/material/Paper";
import { Box, Checkbox, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { usePaymentContext } from "../../context/PaymentContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { apiClient } from "../../api/client";
import Button from "@mui/material/Button";

export interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

type Props = {
  columns: IColumn[];
  children: React.ReactNode;
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
};

const CustomTable = ({
  count,
  columns,
  children,
  page,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  onSelectAllClick,
  numSelected,
}: Props) => {
  //handle pagination

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { checkedPayments, setCheckedPayments } = usePaymentContext();
  const { setSnackMessage, setSnackOpen, setParams } = useGlobalContext();
  const { user } = useAuthContext();

  const handleVerify = async () => {
    try {
      const response = await apiClient.post<{ message: string }>(
        "/payments/verify",
        {
          ids: checkedPayments,
        }
      );
      if (response.status === 200) {
        setCheckedPayments([]);
        setSnackMessage(response.data.message);
        setSnackOpen(true);
        setParams({});
      }
    } catch (error: any) {
      setSnackMessage(error.message);
      setSnackOpen(true);
    }
  };

  return (
    <Paper sx={{ width: 1200, overflow: "hidden", mt: 3, boxShadow: 5, p: 1 }}>
  {numSelected > 0 && (
    <Toolbar sx={{ bgcolor: "#BB892D33" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography>{numSelected} payments selected</Typography>
        <Box flexGrow={1} display="flex" alignItems="center" justifyContent="flex-end">
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setCheckedPayments([])}>
            cancel
          </Button>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleVerify()}>
            verify {numSelected} payments
          </Button>
        </Box>
      </Box>
    </Toolbar>
  )}
  <TableContainer sx={{ width: "100%", maxHeight: 400, overflowY: 'auto' }}>
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow sx={{ height: 20, fontFamily: 'Poppins' }}>
          <TableCell align="center" sx={{ maxWidth: 0.5 }}>
            <Checkbox
              //indeterminate={numSelected > 0 && numSelected < count}
              checked={count > 0 && numSelected === count}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map((col) => (
            <TableCell key={col.id} style={{ minWidth: col.minWidth }}>
              {col.label}
            </TableCell>
          ))}
          <TableCell align="center">Credit Period</TableCell>
          {user?.role === "ADMIN" && (
            <TableCell align="center">Actions</TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</Paper>

  );
};

export default CustomTable;
