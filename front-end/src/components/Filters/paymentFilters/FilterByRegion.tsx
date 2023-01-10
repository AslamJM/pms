import { useGlobalContext } from "../../../context/GlobalContext";
import { useShopContext } from "../../../context/ShopContext";
import { usePaymentContext } from "../../../context/PaymentContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";

const FilterByRegion = () => {
  const { setParams } = useGlobalContext();
  const { setAllPayments, payments } = usePaymentContext();

  return (
    <div style={{ flexGrow: 1, marginRight: 10 }}>
      <FormControl fullWidth>
        <InputLabel>Region</InputLabel>
        <Select
          fullWidth
          onChange={(e) =>
            setAllPayments(
              payments.filter(
                (payment) => payment.shop.region === e.target.value
              )
            )
          }
          size="small"
        >
          {["region a", "region b", "region c", "region d"].map(
            (item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByRegion;
