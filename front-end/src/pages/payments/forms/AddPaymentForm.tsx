import {
  Button,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useGlobalContext } from "../../../context/GlobalContext";
import DatePicker from "../../../components/datepicker";
import { FORM_MODEL, PAYMENT_METHOD, PAYMENT_STATUS } from "./data";
import { useShopContext } from "../../../context/ShopContext";
import { useCollectorContext } from "../../../context/CollectorContext";

//need to change initial values
const initialValues = {
  shop: "",
  amount: 0,
  paidAmount: 0,
  dueAmount: 0,
  free: 0,
  discount: 0,
  returnAmount: 0,
  collector: "",
  company: "",
  invoice: "",
  paymentDate: "",
  dueDate: "",
  paymentStatus: "",
  paymentMethod: "",
};

//backend data for shops and collectors
const REGIONS = ["region a", "region b", "region c", "region d"];

const AddPaymentForm = () => {
  const { setAddModalOpen, companies } = useGlobalContext();
  const { shops } = useShopContext();
  const { collectors } = useCollectorContext();

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box width="500px">
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>shop</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.shop}
                    value={values.shop}
                  >
                    {shops.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>collector</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.collector}
                  >
                    {collectors.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.invoice}
                    label="Invoice No."
                    fullWidth
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>company</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.company}
                  >
                    {companies.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.amount}
                    label="Amount"
                    fullWidth
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField name={FORM_MODEL.free} label="Free" fullWidth />
                </FormControl>
              </Box>

              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.discount}
                    label="Discount"
                    fullWidth
                  />
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.paidAmount}
                    label="Paid Amount"
                    fullWidth
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.dueAmount}
                    label="Due Amount"
                    fullWidth
                  />
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.paymentMethod}
                  >
                    {PAYMENT_METHOD.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.paymentStatus}
                  >
                    {PAYMENT_STATUS.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <DatePicker
                    label="Payment Date"
                    name={FORM_MODEL.paymentDate}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <DatePicker label="Due Date" name={FORM_MODEL.dueDate} />
                </FormControl>
              </Box>
            </Box>
          </Box>
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

export default AddPaymentForm;
