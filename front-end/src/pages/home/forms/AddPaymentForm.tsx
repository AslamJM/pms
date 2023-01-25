import {
  Button,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useGlobalContext } from "../../../context/GlobalContext";
import DatePicker from "../../../components/datepicker";
import {
  FORM_MODEL,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from "../../payments/forms/data";
import { paymentClient } from "../../../api/payments";
import { useShopContext } from "../../../context/ShopContext";
import { useCollectorContext } from "../../../context/CollectorContext";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";

const initialValues = {
  shop: "",
  amount: "",
  paidAmount: "",
  dueAmount: "",
  free: "",
  discount: "",
  returnAmount: "",
  marketReturn: "",
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
  const [due, setDue] = useState("");
  const [ffree, setFree] = useState("");
  const [fdiscount, setDiscount] = useState("");
  const [fpaid, setPaid] = useState("");
  const [freturn, setReturn] = useState("");
  const [market, setMarket] = useState("");

  const {
    setAddModalOpen,
    companies,
    setLoading,
    setSnackMessage,
    setSnackOpen,
  } = useGlobalContext();
  const { shops } = useShopContext();
  const { collectors } = useCollectorContext();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(paymentClient.createPayment);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const { dueDate, paymentDate } = values;

        mutate(
          {
            ...values,
            free: Number(ffree),
            discount: Number(fdiscount),
            paidAmount: Number(fpaid),
            dueAmount: Number(due),
            returnAmount: Number(freturn),
            marketReturn: Number(market),
            paymentDate: new Date(paymentDate),
            dueDate: new Date(dueDate),
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries("all payments");

              setLoading(false);
              setSnackMessage(data.message);
              setSnackOpen(true);
            },
            onError: (error: any) => {
              console.log(error);
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
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>Shop</InputLabel>
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
                  <InputLabel>Collector</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.collector}
                    value={values.collector}
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
                    value={values.invoice}
                    onChange={handleChange}
                    label="Invoice No."
                    fullWidth
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="50%">
                <FormControl fullWidth>
                  <InputLabel>Company</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.company}
                    value={values.company}
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
                    name={FORM_MODEL.paidAmount}
                    label="Paid Amount"
                    fullWidth
                    value={fpaid}
                    onChange={(e) => {
                      setPaid(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.free}
                    label="Free"
                    fullWidth
                    value={ffree}
                    onChange={(e) => {
                      setFree(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>

              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.discount}
                    label="Discount"
                    fullWidth
                    value={fdiscount}
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.returnAmount}
                    label="Saleble Return"
                    fullWidth
                    value={freturn}
                    onChange={(e) => {
                      setReturn(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.marketReturn}
                    label="Market Return"
                    fullWidth
                    value={market}
                    onChange={(e) => {
                      setMarket(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.5 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.dueAmount}
                    label="Due Amount"
                    fullWidth
                    value={due}
                    onChange={(e) => {
                      setDue(e.target.value);
                    }}
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
                    value={values.paymentMethod}
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
                    value={values.paymentStatus}
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

export default AddPaymentForm;
