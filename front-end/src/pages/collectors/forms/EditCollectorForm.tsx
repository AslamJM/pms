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
import { useCollectorContext } from "../../../context/CollectorContext";
import { useMutation, useQueryClient } from "react-query";
import { ICollector, apiClient } from "../../../api/client";

const EditCollectorForm = () => {
  const { setEditModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();

  const { selectedCollector } = useCollectorContext();

  const { isLoading, mutate } = useMutation(
    async (input: Partial<ICollector>) =>
      await apiClient.patch<{ shop: ICollector; message: string }>(
        `/collectors/update/${selectedCollector?._id}`,
        { input }
      )
  );
  const queryClient = useQueryClient();
  return (
    <Formik
      initialValues={{
        name: selectedCollector?.name,
        phone: selectedCollector?.phone,
        email: selectedCollector?.email,
      }}
      onSubmit={(values, { resetForm }) => {
        if (isLoading) setLoading(true);
        mutate(
          { ...values },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries("all collectors");

              setLoading(false);
              setSnackMessage(data.data.message);
              setEditModalOpen(false);
              setSnackOpen(true);
              resetForm();
            },
            onError: (error: any) => {
              setLoading(false);
              setSnackMessage(error.message);
              setEditModalOpen(false);
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
              {isLoading ? <CircularProgress /> : "Update"}
            </Button>
            <Button
              onClick={() => setEditModalOpen(false)}
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

export default EditCollectorForm;
