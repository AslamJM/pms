import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, OutlinedInput } from "@mui/material";

const FilterByStatus = () => {
  const { setParams } = useGlobalContext();

  return (
    <div style={{ width: 242, marginRight: 17 }}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Payment Status</InputLabel>
        <Select
          onChange={(e) => setParams({ paymentStatus: e.target.value })}
          input={<OutlinedInput label="Payment Status" />}
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
