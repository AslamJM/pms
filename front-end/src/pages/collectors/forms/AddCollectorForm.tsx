import {
  Button,
  Grid,
  TextField,
  DialogActions,
  FormControl,
} from "@mui/material";

import { Formik } from "formik";
import { useGlobalContext } from "../../../context/GlobalContext";
import { FORM_MODEL } from "./data";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

const AddCollectorForm = () => {
  const { setAddModalOpen } = useGlobalContext();

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={1} columnGap={1}>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField name={FORM_MODEL.name} label="Name" fullWidth />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField
                  name={FORM_MODEL.phone}
                  label="Phone Number"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField name={FORM_MODEL.email} label="E-Mail" fullWidth />
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

export default AddCollectorForm;
