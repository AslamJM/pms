import { Dialog, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../context/GlobalContext";

type Props = {
  title: string;
  children: React.ReactNode;
  type: "edit" | "delete" | "add";
};

const Modal = ({ title, children, type }: Props) => {
  const {
    deleteModalOpen,
    editModalOpen,
    addModalOpen,
    setAddModalOpen,
    setEditModalOpen,
    setDeleteModalOpen,
  } = useGlobalContext();
  return (
    <Dialog
      open={
        type === "delete"
          ? deleteModalOpen
          : type === "edit"
          ? editModalOpen
          : addModalOpen
      }
    >
      <DialogTitle>
        {title}{" "}
        <IconButton
          aria-label="close"
          onClick={() => {
            if (type === "delete") {
              setDeleteModalOpen(false);
            } else if (type === "edit") {
              setEditModalOpen(false);
            } else {
              setAddModalOpen(false);
            }
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
