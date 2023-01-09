import {
  Button,
  Grid,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useShopContext } from "../../../context/ShopContext";
import { IShop, apiClient } from "../../../api/client";
import { useGlobalContext } from "../../../context/GlobalContext";

const REGIONS = ["region a", "region b", "region c", "region d"];

const EditShopForm = () => {
  const { setEditModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { selectedShop, setSelectedShop } = useShopContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (input: Partial<IShop>) =>
      await apiClient.patch<{ shop: IShop; message: string }>(
        `/shops/update/${selectedShop?._id}`,
        { input }
      )
  );

  return (
    <Formik
      initialValues={{
        name: selectedShop?.name,
        address: selectedShop?.address,
        region: selectedShop?.region,
      }}
      onSubmit={(values, { resetForm }) => {
        if (isLoading) setLoading(true);
        mutate(
          { ...values },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries("all shops");
              setSelectedShop(null);
              setLoading(false);
              setSnackMessage(data.data.message);
              setSnackOpen(true);
            },
            onError: (error: any) => {
              console.log(error);
              setSnackMessage(error.message);
              setSnackOpen(true);
            },
            onSettled: () => {
              setLoading(false);
              setEditModalOpen(false);
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
              <FormControl fullWidth>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>select region</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="region"
                  value={values.region}
                >
                  {REGIONS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
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
              {isLoading ? <CircularProgress /> : "update"}
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

export default EditShopForm;
