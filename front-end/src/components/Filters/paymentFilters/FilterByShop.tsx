import { useShopContext } from "../../../context/ShopContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMemo } from "react";

const FilterByShop = () => {
  const { shops } = useShopContext();
  const { setParams } = useGlobalContext();

  const shopOptions = useMemo(() => {
    return shops.map((s) => ({ label: s.name, _id: s._id }));
  }, [shops]);

  return (
    <div style={{ width: 242, marginRight: 17 }}>
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
