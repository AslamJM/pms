import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShopContext } from "../../context/ShopContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import DeleteShopModel from "./modals/DeleteShopModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, TableContainer, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "region", label: "Region" },
];

const ShopTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const { setSelectedShop, shops } = useShopContext();
  const { user } = useAuthContext();

  if (shops.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "Montserrat",
            textAlign: "center",
          }}
        >
          You have no shops to display
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <DeleteShopModel />
      <Paper
        sx={{
          width: 750,
          my: 1,
          p: 1,
          boxShadow: 5,
          fontFamily: "Poppins",
          mt: 2,
          ml: 3,
          borderRadius: "10px",
        }}
      >
        <TableContainer style={{ maxHeight: 430 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins",
              textAlign: "center",
              mt: 1,
            }}
          >
            List of Shops
          </Typography>
          <CustomTable
            columns={columns}
            count={shops.length!}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          >
            {shops
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, setkey) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={setkey}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& .MuiTableCell-root": {
                        padding: "4px 8px",
                      },
                      height: "48px",
                    }}
                  >
                    {columns.map((col, index) => {
                      if (col.id === "region") {
                        return (
                          <TableCell
                            key={index}
                            align={col.align}
                            sx={{ fontFamily: "Poppins" }}
                          >
                            {row["region"]?.name}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={index}
                          align={col.align}
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {
                            row[
                              col.id as keyof Omit<
                                typeof row,
                                "_id" | "region" | "company"
                              >
                            ]
                          }
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
                              setSelectedShop(row);
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
                              setSelectedShop(row);
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
        </TableContainer>
      </Paper>
    </>
  );
};

export default ShopTable;
