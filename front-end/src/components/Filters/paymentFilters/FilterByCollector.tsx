import { useCollectorContext } from "../../../context/CollectorContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMemo } from "react";

const FilterByCollector = () => {
  const { collectors } = useCollectorContext();
  const { setParams } = useGlobalContext();

  const collectorOptions = useMemo(() => {
    return collectors.map((c) => ({ label: c.name, _id: c._id }));
  }, [collectors]);

  return (
    <div style={{ width: 242, marginRight: 17 }}>
      <FormControl fullWidth>
        <Autocomplete
          autoSelect
          options={collectorOptions}
          renderInput={(params) => (
            <TextField {...params} label="Collector" size="small" />
          )}
          onChange={(e, v) => setParams({ collector: v?._id })}
        />
      </FormControl>
    </div>
  );
};

export default FilterByCollector;
