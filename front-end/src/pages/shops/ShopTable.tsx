import CustomTable, { IColumn } from "../../components/tables/Table";
import { useQuery } from "react-query";
import CircularLoader from "../../components/loader/CircularLoader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { shopClient } from "../../api/shops";
import { useShopContext } from "../../context/ShopContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import DeleteShopModel from "./modals/DeleteShopModal";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "region", label: "Region" },
  { id: "lastPayment", label: "Last Payment" },
];

const ShopTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen } = useGlobalContext();
  const { getAllShops } = shopClient;
  const { setAllShops, setSelectedShop } = useShopContext();

  const { data, isLoading, isError } = useQuery(
    "all shops",
    async () => await getAllShops(),
    {
      onSuccess: (data) => setAllShops(data.shops),
    }
  );

  if (isLoading) {
    return <CircularLoader />;
  }

  if (isError) {
    return <div>an error occurred</div>;
  }

  if (data?.shops.length === 0) {
    return (
      <Box>
        <Typography variant="h3" color="GrayText" align="center">
          You have no shops to display
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <DeleteShopModel />
      <CustomTable
        columns={columns}
        count={data?.shops.length!}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {data?.shops
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, setkey) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={setkey}>
                {columns.map((col, index) => {
                  if (col.id === "lastPayment") {
                    const lastPayment =
                      row.payments.length !== 0
                        ? row.payments[0].paymentDate
                        : null;

                    if (!lastPayment) {
                      return (
                        <TableCell key={index}>
                          <Chip label="no payments yet" variant="outlined" />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={index} sx={{ textAlign: "center" }}>
                        {dayjs(new Date(lastPayment)).format("DD/MM/YYYY")}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={index} align={col.align}>
                      {
                        row[
                          col.id as keyof Omit<typeof row, "_id" | "payments">
                        ]
                      }
                    </TableCell>
                  );
                })}
                <TableCell>
                  <BorderColorIcon
                    color="success"
                    sx={{
                      cursor: "pointer",
                    }}
                    fontSize="medium"
                  />
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    color="error"
                    sx={{ cursor: "pointer" }}
                    fontSize="medium"
                    onClick={() => {
                      setSelectedShop(row);
                      setDeleteModalOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
      </CustomTable>
    </>
  );
};

export default ShopTable;
