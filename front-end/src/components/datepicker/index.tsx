import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useField } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  name: string;
}

const FormikDateTimePicker = ({ label, ...props }: Props) => {
  const [field, , { setValue }] = useField(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        {...field}
        {...props}
        onChange={(val) => {
          setValue(val);
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth label={label} />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormikDateTimePicker;
