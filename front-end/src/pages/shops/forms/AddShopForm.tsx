import {
  Button,
  Grid,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  OutlinedInput,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { IShop } from "../../../api/client";
import { shopClient } from "../../../api/shops";
import { useGlobalContext } from "../../../context/GlobalContext";

const initialValues = {
  name: "",
  address: "",
  region: "",
};

const AddShopForm = () => {
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen, areas } =
    useGlobalContext();
  const { createShop } = shopClient;
  const { isLoading, mutate } = useMutation(
    async (input: { name: string; region: string; address: string }) =>
      await createShop(input)
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
              queryClient.invalidateQueries("all shops");

              setLoading(false);
              setSnackMessage(data.message);
              setSnackOpen(true);
            },
            onError: (error: any) => {
              setSnackMessage(error.message);
              setSnackOpen(true);
            },
            onSettled: () => {
              setLoading(false);
              setAddModalOpen(false);
              resetForm();
            },
          }
        );
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={1} columnGap={1}>
            <Grid item xs={6}>
              <FormControl fullWidth >
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  sx={{ marginTop: 2 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ fontFamily: 'Poppins' }}>Select Region</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="region"
                  value={values.region}
                  input={<OutlinedInput label="Select Region" />}
                    size="small"
                    sx={{ fontFamily:"Poppins" }}
                >
                  {areas.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="address"
                  label="Address"
                  fullWidth
                  value={values.address}
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

export default AddShopForm;
