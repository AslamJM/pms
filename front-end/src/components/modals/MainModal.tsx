import { Dialog, DialogTitle } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";

type Props = {
  title: string;
  children: React.ReactNode;
  type: "edit" | "delete" | "add";
};

const Modal = ({ title, children, type }: Props) => {
  const { deleteModalOpen, editModalOpen, addModalOpen } = useGlobalContext();
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
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
