import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMemo } from "react";

const FilterByCompany = () => {
  const { setParams, companies } = useGlobalContext();

  const companyOptions = useMemo(() => {
    return companies.map((c) => ({ label: c.name, _id: c._id }));
  }, [companies]);

  return (
    <div style={{ width: 200, marginRight: 10 }}>
      <FormControl fullWidth>
        <Autocomplete
          autoSelect
          options={companyOptions}
          renderInput={(params) => (
            <TextField {...params} label="Company" size="small" />
          )}
          onChange={(e, v) => setParams({ company: v?._id })}
        />
      </FormControl>
    </div>
  );
};

export default FilterByCompany;
