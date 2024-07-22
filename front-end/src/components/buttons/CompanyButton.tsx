import Button from "@mui/material/Button";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useGlobalContext } from "../../context/GlobalContext";

type Props = {
  title: string;
};

const CompanyButton = ({ title }: Props) => {
  const { setSelectedCompany } = useGlobalContext();

  return (
    <Button
      size="large"
      startIcon={<InsertChartIcon />}
      variant="outlined"
      color="primary"
      onClick={() => setSelectedCompany(title)}
      sx={{ width: '100%', height: 40 }}
    >
      {title}
    </Button>
  );
};

export default CompanyButton;