import { Select, MenuItem } from "@mui/material";
import { dateRanges } from "./data";

const DateRangeFilter = () => {
  return (
    <Select>
      {dateRanges.map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}
    </Select>
  );
};

export default DateRangeFilter;
