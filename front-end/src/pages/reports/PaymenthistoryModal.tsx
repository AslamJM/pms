import Modal from "../../components/modals/MainModal";
import { apiClient, ICollector } from "../../api/client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  DialogContent,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import currencyFormatter from "currency-formatter";
import dayjs, { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCollectorContext } from "../../context/CollectorContext";
import { useQuery, useQueryClient } from "react-query";

type Props = {
  paymentId: string;
  invoice: string;
};
interface IPaymentHisory {
  _id: string;
  payment: string;
  amount: number;
  updateDate: Date;
  collector: ICollector;
}

//single history component
const HistoryComponent = ({ prop }: { prop: IPaymentHisory }) => {
  const { amount, collector, updateDate } = prop;
  const [edit, setEdit] = useState(false);
  const [deleteH, setDeleteH] = useState(false);
  const [collectorId, setCollectorId] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [amountUpdate, setAmount] = useState(amount.toString());

  const { collectors } = useCollectorContext();

  const queryClient = useQueryClient();

  const collectorOptions = useMemo(() => {
    return collectors.map((c) => ({ label: c.name, _id: c._id }));
  }, []);

  const handleChange = async (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const deleteHistory = async () => {
    await apiClient.delete(`/history/${prop._id}`);
    setDeleteH(false);
    queryClient.invalidateQueries("history");
  };

  const updateHistory = async () => {
    await apiClient.patch(`/history/${prop._id}`, {
      amount: Number(amountUpdate),
      collector: collectorId,
      updateDate: date?.toISOString(),
    });
    setEdit(false);
    queryClient.invalidateQueries("history");
  };

  if (deleteH) {
    return (
      <Box display="flex" alignItems="center" my={1}>
        <Typography>do you want to delete this?</Typography>
        <Divider orientation="vertical" flexItem />

        <Tooltip title="cancel" sx={{ mx: 1 }}>
          <IconButton
            onClick={() => {
              setDeleteH(false);
            }}
          >
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete" sx={{ mx: 1 }}>
          <IconButton onClick={() => deleteHistory()}>
            <CheckIcon color="success" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  if (edit) {
    return (
      <Box display="flex" alignItems="center" my={1}>
        <TextField
          value={amountUpdate}
          onChange={(e) => setAmount(e.target.value)}
          variant="standard"
          sx={{ mx: 1, width: 100 }}
          size="small"
        />
        <Autocomplete
          autoSelect
          options={collectorOptions}
          sx={{ mx: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Collector"
              size="small"
              sx={{ mx: 1 }}
            />
          )}
          onChange={(e, v) => setCollectorId(v?._id!)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mx={1} style={{ width: 200 }}>
            <DesktopDatePicker
              label="PaymentDate"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ mr: 1 }} size="small" />
              )}
            />
          </Box>
        </LocalizationProvider>
        <Divider orientation="vertical" flexItem />

        <Tooltip title="cancel" sx={{ mx: 1 }}>
          <IconButton
            onClick={() => {
              setEdit(false);
            }}
          >
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="update" sx={{ mx: 1 }}>
          <IconButton onClick={() => updateHistory()}>
            <CheckIcon color="success" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" my={1}>
      <Typography mx={1} sx={{ flex: 1 }}>
        {currencyFormatter.format(amount, {})}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography mx={1} sx={{ flex: 1 }}>
        {collector.name}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography mx={1} sx={{ flex: 1 }}>
        {dayjs(updateDate).format("DD/MM/YYYY")}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="edit" sx={{ mx: 1 }}>
        <IconButton
          onClick={() => {
            setEdit(true);
          }}
        >
          <BorderColorIcon color="success" fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete" sx={{ mx: 1 }}>
        <IconButton
          onClick={() => {
            setDeleteH(true);
          }}
        >
          <DeleteIcon color="error" fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

// payment history modal

const PaymentHistoryModal = ({ paymentId, invoice }: Props) => {
  const [paymentHistory, setPaymentHistory] = useState<IPaymentHisory[] | null>(
    null
  );

  //get payment history
  const getHistory = async (id: string) => {
    const { data } = await apiClient.get<{ payments: IPaymentHisory[] }>(
      `/history/${id}`
    );

    return data;
  };

  const { isLoading } = useQuery(
    ["history", paymentId],
    async () => await getHistory(paymentId),
    {
      onSuccess: (data) => setPaymentHistory(data.payments),
    }
  );

  return (
    <Modal type="add" title="Payment History">
      <DialogContent sx={{ width: 600 }}>
        {isLoading ? (
          <Box>fetching history....</Box>
        ) : paymentHistory?.length === 0 ? (
          <Box>you have no previous payments</Box>
        ) : (
          <Box>
            <Typography component="em" my={1}>
              #{invoice}
            </Typography>
            <Divider />
            {paymentHistory?.map((p) => (
              <HistoryComponent key={p._id} prop={p} />
            ))}
          </Box>
        )}
      </DialogContent>
    </Modal>
  );
};

export default PaymentHistoryModal;
