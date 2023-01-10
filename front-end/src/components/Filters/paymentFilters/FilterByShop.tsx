import { useShopContext } from "../../../context/ShopContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const FilterByShop = () => {
  const { shops } = useShopContext();
  const { setParams } = useGlobalContext();

  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <FormControl fullWidth>
        <InputLabel>shop</InputLabel>
        <Select
          fullWidth
          onChange={(e) => setParams({ shop: e.target.value })}
          size="small"
        >
          {shops.map((item, index) => (
            <MenuItem key={index} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByShop;
