import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { apiClient } from "../../../api/client";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const DeleteAreaModal = ({ open, id, setOpen }: Props) => {
  const deleteCompany = async () => {
    const response = await apiClient.delete<{ message: string }>(
      `/areas/delete/${id}`
    );

    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(async () => await deleteCompany(), {
    onSuccess: () => queryClient.invalidateQueries("all areas"),
    onSettled: () => setOpen(false),
  });

  return (
    <Dialog open={open}>
      <DialogTitle>Delete Area</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete this area?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => mutate()}>
          {isLoading ? <CircularProgress /> : "delete"}
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined">
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAreaModal;
