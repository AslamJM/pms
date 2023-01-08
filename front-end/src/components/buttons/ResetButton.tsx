import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/GlobalContext";

const ResetButton = () => {
  const { resetParams } = useGlobalContext();
  return (
    <Button onClick={() => resetParams({})} variant="contained">
      Reset Filters
    </Button>
  );
};

export default ResetButton;
