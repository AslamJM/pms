import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const FilterByCompany = () => {
  const { setParams, companies } = useGlobalContext();

  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <FormControl fullWidth>
        <InputLabel>company</InputLabel>
        <Select
          fullWidth
          onChange={(e) => setParams({ company: e.target.value })}
          size="small"
        >
          {companies.map((item, index) => (
            <MenuItem key={index} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByCompany;
