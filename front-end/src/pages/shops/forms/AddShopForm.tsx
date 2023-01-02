import {
  Button,
  Grid,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { shopClient } from "../../../api/shops";
import { useGlobalContext } from "../../../context/GlobalContext";
import { FORM_MODEL } from "./data";

const initialValues = {
  name: "",
  address: "",
  region: "",
};

const REGIONS = ["region a", "region b", "region c", "region d"];

const AddShopForm = () => {
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { createShop } = shopClient;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const { isLoading, mutate } = useMutation(
          async () => await createShop({ ...values, payments: [] })
        );
        if (isLoading) setLoading(true);
      }}
    >
      {({ handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={1} columnGap={1}>
            <Grid xs={5}>
              <FormControl fullWidth>
                <TextField name={FORM_MODEL.name} label="Name" fullWidth />
              </FormControl>
            </Grid>
            <Grid xs={5}>
              <FormControl fullWidth>
                <InputLabel>select region</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name={FORM_MODEL.region}
                >
                  {REGIONS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField
                  name={FORM_MODEL.address}
                  label="Address"
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              add
            </Button>
            <Button
              onClick={() => setAddModalOpen(false)}
              variant="outlined"
              color="error"
            >
              cancel
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

export default AddShopForm;
