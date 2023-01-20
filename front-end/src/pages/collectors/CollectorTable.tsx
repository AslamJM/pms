import { useState } from "react";
import CustomTable, { IColumn } from "../../components/tables/Table";
import { useCollectorContext } from "../../context/CollectorContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "E-Mail" },
];

const CollectorTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { collectors, setSelectedCollector } = useCollectorContext();
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const { user } = useAuthContext();

  if (collectors.length === 0) {
    return (
      <Box>
        <Typography variant="h3" color="GrayText" align="center">
          You have no collectors to display
        </Typography>
      </Box>
    );
  }

  return (
    <CustomTable
      columns={columns}
      count={collectors.length!}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
    >
      {collectors
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, setkey) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={setkey}>
              {columns.map((col, index) => {
                return (
                  <TableCell key={index} align={col.align}>
                    {row[col.id as keyof Omit<typeof row, "_id" | "payments">]}
                  </TableCell>
                );
              })}
              {user?.role === "ADMIN" && (
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="edit">
                    <IconButton
                      onClick={() => {
                        setSelectedCollector(row);
                        setEditModalOpen(true);
                      }}
                    >
                      <BorderColorIcon
                        color="success"
                        sx={{
                          cursor: "pointer",
                        }}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="delete">
                    <IconButton
                      onClick={() => {
                        setSelectedCollector(row);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <DeleteIcon
                        color="error"
                        sx={{ cursor: "pointer" }}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          );
        })}
    </CustomTable>
  );
};

export default CollectorTable;
