import { useGlobalContext } from "../../../context/GlobalContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const VerifedFilter = () => {
  const { setParams, params } = useGlobalContext();

  return (
    <FormControl>
      <FormLabel sx={{ fontWeight: 'bold', color: 'black' }}>Verified Status</FormLabel>
      <RadioGroup row>
        <FormControlLabel
          value="verified"
          control={
            <Radio
              onChange={() => setParams({ verified: true })}
              size="small"
            />
          }
          label="Verified"
        />
        <FormControlLabel
          value="not"
          control={
            <Radio
              onChange={() => setParams({ verified: false })}
              size="small"
            />
          }
          label="Not"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default VerifedFilter;
