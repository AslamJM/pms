//@ts-ignore
import ExcelExport from "export-xlsx";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { usePaymentContext } from "../../context/PaymentContext";
import { SETTINGS_FOR_EXPORT, getExcelData } from "./excel-settings";

const ExportExcelButton = () => {
  const { payments } = usePaymentContext();

  const excelExport = new ExcelExport();

  const downloadExcel = () => {
    const data = payments.map((payment) => getExcelData(payment));
    console.log(data);

    //excelExport.downloadExcel(SETTINGS_FOR_EXPORT, data);
  };

  return (
    <Button
      size="large"
      startIcon={<DriveFolderUploadIcon />}
      variant="outlined"
      color="primary"
      onClick={() => downloadExcel()}
    >
      Export to Excel
    </Button>
  );
};

export default ExportExcelButton;
