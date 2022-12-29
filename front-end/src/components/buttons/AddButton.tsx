import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useGlobalContext } from "../../context/GlobalContext";

type Props = {
  title: string;
};

const AddButton = ({ title }: Props) => {
  const { setAddModalOpen } = useGlobalContext();

  return (
    <Button
      size="large"
      startIcon={<AddCircleOutlineIcon />}
      variant="outlined"
      color="primary"
      onClick={() => setAddModalOpen(true)}
    >
      {title}
    </Button>
  );
};

export default AddButton;
