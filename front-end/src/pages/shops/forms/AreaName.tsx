import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../../api/client";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteAreaModal from "../modals/DeleteAreaModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const AreaName = ({ name, id }: { name: string; id: string }) => {
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState("");
  const [del, setDelete] = useState(false);
  const { user } = useAuthContext();

  const updateArea = async () => {
    const response = await apiClient.patch<{ message: string }>(
      `/areas/update/${id}`,
      {
        input: { name: editVal },
      }
    );

    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(async () => await updateArea(), {
    onSuccess: () => queryClient.invalidateQueries("all areas"),
    onSettled: () => setEdit(false),
  });

  return (
    <Box display="flex" width={600} mt={1}>
      <DeleteAreaModal open={del} setOpen={setDelete} id={id} />
      {edit ? (
        <FormControl variant="standard">
          <Input
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setEdit(false)}>
                  <CloseIcon />
                </IconButton>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <IconButton onClick={() => mutate()}>
                    <CheckIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <Typography variant="body1" sx={{ my: 1, minWidth: 200 }}>
          {name}
        </Typography>
      )}
      {!edit && user?.role === "ADMIN" && (
        <Box display="flex" alignItems="flex-end">
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setEditVal(name);
                setEdit(true);
              }}
            >
              <BorderColorIcon color="success" fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => setDelete(true)}>
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default AreaName;
