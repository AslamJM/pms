import { TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createArea } from "../../../api/company";

const AddArea = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async () => await createArea(name),
    {
      onSuccess: () => queryClient.invalidateQueries("all areas"),
      onSettled: () => setName(""),
    }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        marginLeft: 10,
      }}
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ width: 400, mr: 1 }}
        size="small"
      />
      <Button variant="contained" onClick={() => mutate()}>
        {isLoading ? "adding..." : "add area"}
      </Button>
    </div>
  );
};

export default AddArea;
