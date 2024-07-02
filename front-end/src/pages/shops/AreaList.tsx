import { useGlobalContext } from "../../context/GlobalContext";
import AreaName from "./forms/AreaName";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

const AreaList = () => {
  const { areas } = useGlobalContext();
  return (
    <div style={{ padding: '8px 0', fontFamily: 'Poppins' }}>
      <Paper sx={{ width: "85%", overflowY: "auto", overflowX: "hidden", mt: 1, boxShadow: 5, fontFamily: 'Poppins', p: 2, maxHeight: 450, ml: 3, borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Montserrat', textAlign: 'center' }}>List of Areas</Typography>
        {areas.map((a) => (
          <div key={a._id}>
            <AreaName id={a._id} name={a.name} />
            <Divider />
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default AreaList;
