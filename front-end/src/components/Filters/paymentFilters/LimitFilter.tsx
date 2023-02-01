import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const LimitFilter = () => {
  const { setParams } = useGlobalContext();

  return (
    <div style={{ marginRight: 10, marginLeft: 10, width: 200 }}>
      <FormControl fullWidth>
        <InputLabel>count</InputLabel>
        <Select
          fullWidth
          onChange={(e) =>
            setParams({
              limit: e.target.value === "all" ? 0 : Number(e.target.value),
            })
          }
          size="small"
        >
          {["10", "50", "100", "150", "all"].map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LimitFilter;
