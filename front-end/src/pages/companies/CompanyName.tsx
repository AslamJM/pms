import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyName = ({ name }: { name: string }) => {
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState("");
  const [del, setDelete] = useState(false);

  return (
    <Box display="flex">
      {edit ? (
        <TextField
          value={name}
          onChange={(e) => setEditVal(e.target.value)}
          variant="standard"
        />
      ) : (
        <Typography variant="body1" sx={{ my: 1, minWidth: 200 }}>
          {name}
        </Typography>
      )}
      <Box display="flex" alignItems="flex-end">
        <Tooltip title="edit">
          <IconButton
            onClick={() => {
              setEditVal(name);
              setEdit(true);
            }}
          >
            <BorderColorIcon color="success" fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="delete">
          <IconButton>
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CompanyName;
