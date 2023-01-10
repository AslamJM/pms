import { useCollectorContext } from "../../../context/CollectorContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const FilterByCollector = () => {
  const { collectors } = useCollectorContext();
  const { setParams } = useGlobalContext();

  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <FormControl fullWidth>
        <InputLabel>Collector</InputLabel>
        <Select
          fullWidth
          onChange={(e) => setParams({ collector: e.target.value })}
          size="small"
        >
          {collectors.map((item, index) => (
            <MenuItem key={index} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByCollector;
