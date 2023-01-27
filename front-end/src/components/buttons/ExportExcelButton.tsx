//@ts-ignore
import ExcelExport from "export-xlsx";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { usePaymentContext } from "../../context/PaymentContext";
import { SETTINGS_FOR_EXPORT, getExcelData } from "./excel-settings";

// Export settings
// export const SETTINGS_FOR_EXPORT = {
//   // Table settings
//   fileName: "example",
//   workSheets: [
//     {
//       sheetName: "example",
//       startingRowNumber: 2,
//       gapBetweenTwoTables: 2,
//       tableSettings: {
//         table1: {
//           tableTitle: "Score",
//           headerGroups: [
//             {
//               name: "",
//               key: "void",
//               groupKey: "directions",
//             },
//             {
//               name: "Science",
//               key: "science",
//               groupKey: "directions",
//             },
//             {
//               name: "Directions",
//               key: "directions",
//             },
//           ],
//           headerDefinition: [
//             {
//               name: "#",
//               key: "number",
//             },
//             {
//               name: "Name",
//               key: "name",
//             },
//             {
//               name: "SUM",
//               key: "sum",
//               groupKey: "void",
//               rowFormula:
//                 "{math}+{physics}+{chemistry}+{informatics}+{literature}+{foreignLang}",
//             },
//             {
//               name: "Mathematics",
//               key: "math",
//               groupKey: "science",
//             },
//             {
//               name: "Physics",
//               key: "physics",
//               groupKey: "science",
//             },
//             {
//               name: "Chemistry",
//               key: "chemistry",
//               groupKey: "science",
//             },
//             {
//               name: "Informatics",
//               key: "informatics",
//               groupKey: "science",
//             },
//             {
//               name: "Literature",
//               key: "literature",
//               groupKey: "science",
//             },
//             {
//               name: "Foreign lang.",
//               key: "foreignLang",
//               groupKey: "science",
//             },
//             {
//               name: "AVG",
//               key: "avg",
//               groupKey: "void",
//               rowFormula: "{sum}/6",
//             },
//           ],
//         },
//       },
//     },
//   ],
// };

const ExportExcelButton = () => {
  const { payments } = usePaymentContext();

  const excelExport = new ExcelExport();

  const downloadExcel = () => {
    const data = payments.map((payment) => getExcelData(payment));

    const excelData = [{ table1: data }];

    excelExport.downloadExcel(SETTINGS_FOR_EXPORT, excelData);
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
