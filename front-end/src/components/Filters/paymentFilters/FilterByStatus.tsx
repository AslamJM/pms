import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const FilterByStatus = () => {
  const { setParams } = useGlobalContext();

  return (
    <div style={{ width: 200, marginRight: 10 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Payment Status</InputLabel>
        <Select
          fullWidth
          onChange={(e) => setParams({ paymentStatus: e.target.value })}
          size="small"
        >
          {["PAID", "DUE", "CANCELLED"].map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByStatus;
