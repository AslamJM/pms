import { useState } from "react";
import CustomTable, { IColumn } from "../../components/tables/Table";
import { useCollectorContext } from "../../context/CollectorContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { useQuery } from "react-query";
import { collectorClient } from "../../api/collectors";
import CircularLoader from "../../components/loader/CircularLoader";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "E-Mail" },
];

const CollectorTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { collectors, setAllCollectors, setSelectedCollector } =
    useCollectorContext();
  const { getAllCollectors } = collectorClient;
  const { setDeleteModalOpen } = useGlobalContext();

  const { data, isLoading, isError } = useQuery(
    "all collectors",
    getAllCollectors,
    {
      onSuccess: (data) => setAllCollectors(data.collectors),
    }
  );

  if (isLoading) {
    return <CircularLoader />;
  }

  if (isError) {
    return <div>an error occurred</div>;
  }

  if (data?.collectors.length === 0) {
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
      count={data?.collectors.length!}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
    >
      {data?.collectors
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
              <TableCell>
                <IconButton>
                  <BorderColorIcon
                    color="success"
                    sx={{
                      cursor: "pointer",
                    }}
                    fontSize="medium"
                  />
                </IconButton>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          );
        })}
    </CustomTable>
  );
};

export default CollectorTable;
