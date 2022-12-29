import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { REGIONS, PAYMENT_STATUS } from "./data";

export const FilterByRegion = () => {
  return (
    <FormControl sx={{ width: 150, mx: 1 }}>
      <InputLabel> region</InputLabel>
      <Select size="small" fullWidth>
        {REGIONS.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const FilterByPaymentStatus = () => {
  return (
    <FormControl sx={{ width: 150, mx: 1 }}>
      <InputLabel> payment</InputLabel>
      <Select size="small" fullWidth>
        {PAYMENT_STATUS.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
