import {
  Button,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Autocomplete,
  OutlinedInput,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useGlobalContext } from "../../../context/GlobalContext";
import DatePicker from "../../../components/datepicker";
import {
  FORM_MODEL,
  PAYMENT_STATUS,
} from "../../dailysales/forms/data";
import { paymentClient } from "../../../api/payments";
import { useShopContext } from "../../../context/ShopContext";
import { useCollectorContext } from "../../../context/CollectorContext";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useMemo } from "react";

const initialValues = {
  shop: "",
  amount: "",
  totalAmount: "",
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

const AddPaymentForm = () => {
  const [due, setDue] = useState("");
  const [ffree, setFree] = useState("");
  const [fdiscount, setDiscount] = useState("");
  const [fpaid, setPaid] = useState("");
  const [freturn, setReturn] = useState("");
  const [market, setMarket] = useState("");
  const [total, setTotal] = useState("");

  const [shop, setShop] = useState("");

  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const { shops } = useShopContext();
  const { collectors } = useCollectorContext();

  const shopOptions = shops.map((s) => ({ label: s.name, _id: s._id }));

  const queryClient = useQueryClient();

  const { setParams, companies, params } = useGlobalContext();

  console.log(params);

  const companyOptions = useMemo(() => {
    return companies.map((c) => ({ label: c.name, _id: c._id }));
  }, [companies]);

  const collectorOptions = useMemo(() => {
    return collectors.map((c) => ({ label: c.name, _id: c._id }));
  }, [collectors]);

  const { isLoading, mutate } = useMutation(paymentClient.createPayment);

  useEffect(() => {
    setDue((Number(total) - Number(fpaid)).toString());
  }, [fpaid]);


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const { dueDate, paymentDate } = values;
        mutate(
          {
            ...values,
            shop,
            free: Number(ffree),
            discount: Number(fdiscount),
            totalAmount: Number(total),
            paidAmount: Number(fpaid),
            dueAmount: Number(due),
            returnAmount: Number(freturn),
            marketReturn: Number(market),
            paymentDate: new Date(paymentDate),
            dueDate: new Date(dueDate),
            paymentStatus: values.paymentStatus,
            ...params,
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries("all payments");

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
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box>
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
                  <DatePicker
                    label="Invoice Date"
                    name={FORM_MODEL.paymentDate}
                  />
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <Autocomplete
                    autoSelect
                    options={shopOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Shop"
                        size="small"
                        fullWidth
                      />
                    )}
                    onChange={(e, v) => setShop(v?._id!)}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mx: 0.3 }} width="33%">
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
              </Box>
              <Box sx={{ mx: 0.3 }} width="33%">
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
              </Box>
            </Box>

            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.3 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.totalAmount}
                    label="Total Amount"
                    fullWidth
                    value={total}
                    onChange={(e) => {
                      setTotal(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
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
              <Box sx={{ mx: 0.5 }} width="33%">
                <FormControl fullWidth>
                  <TextField
                    name={FORM_MODEL.dueAmount}
                    label="Due Amount"
                    fullWidth
                    value={due}
                    disabled
                  />
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" width="100%" my={2}>
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

              <Box sx={{ mx: 0.5 }} width="33%">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    onChange={handleChange}
                    fullWidth
                    name={FORM_MODEL.paymentStatus}
                    value={values.paymentStatus}
                    input={<OutlinedInput label="Payment Status" />}
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
              <Box sx={{ mx: 0.5 }} width="50%">
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
            </Box>

            <Box display="flex" width="100%" my={2}>
              <Box sx={{ mx: 0.5 }} width="50%"></Box>
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
