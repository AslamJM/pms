import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useField } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  name: string;
}

const FormikDateTimePicker = ({ label, ...props }: Props) => {
  const [field, , { setValue }] = useField(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
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
