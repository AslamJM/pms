import {
  Button,
  Grid,
  TextField,
  DialogActions,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import { useGlobalContext } from "../../../context/GlobalContext";
import CircularProgress from "@mui/material/CircularProgress";
import { FORM_MODEL } from "./data";
import { useMutation, useQueryClient } from "react-query";
import { ICollector } from "../../../api/client";
import { collectorClient } from "../../../api/collectors";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

const AddCollectorForm = () => {
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { createCollector } = collectorClient;
  const { isLoading, mutate } = useMutation(
    async (input: Omit<ICollector, "_id">) => await createCollector(input)
  );
  const queryClient = useQueryClient();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (isLoading) setLoading(true);
        mutate(
          { ...values },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries("all collectors");

              setLoading(false);
              setSnackMessage(data.message);
              setAddModalOpen(false);
              setSnackOpen(true);
              resetForm();
            },
            onError: (error: any) => {
              setLoading(false);
              setSnackMessage(error.message);
              setAddModalOpen(false);
              setSnackOpen(true);
            },
          }
        );
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={1} columnGap={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name={FORM_MODEL.name}
                  label="Name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  sx={{ mt: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name={FORM_MODEL.phone}
                  label="Phone Number"
                  fullWidth
                  value={values.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name={FORM_MODEL.email}
                  label="E-Mail"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              {isLoading ? <CircularProgress /> : "add"}
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
