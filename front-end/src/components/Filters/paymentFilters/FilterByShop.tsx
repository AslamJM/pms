import { useShopContext } from "../../../context/ShopContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FilterByShop = () => {
  const { shops } = useShopContext();
  const { setParams } = useGlobalContext();

  const shopOptions = shops.map((s) => ({ label: s.name, _id: s._id }));

  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <FormControl fullWidth>
        <Autocomplete
          autoSelect
          options={shopOptions}
          renderInput={(params) => (
            <TextField {...params} label="Shop" size="small" />
          )}
          onChange={(e, v) => setParams({ shop: v?._id })}
        />
      </FormControl>
    </div>
  );
};

export default FilterByShop;
