import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useAuthContext } from "../../context/AuthContext";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
};

const CustomTable = ({
  count,
  columns,
  children,
  page,
  setPage,
  setRowsPerPage,
  rowsPerPage,
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

  const { user } = useAuthContext();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", fontFamily: 'Poppins' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: "#BB892D" }}>
            <TableRow >
              {columns.map((col) => (
                <TableCell key={col.id} style={{ minWidth: col.minWidth }} sx={{
                  fontWeight: 'bold', fontFamily: 'Poppins', fontSize: 15 }}>
                  {col.label}
                </TableCell>
              ))}
              {user?.role === "ADMIN" && (
                <TableCell align="center" sx={{
                  fontWeight: 'bold', fontFamily: 'Poppins', fontSize: 15 }}>Actions</TableCell>
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
