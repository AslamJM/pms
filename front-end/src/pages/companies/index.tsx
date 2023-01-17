import { Box, Button, Divider, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useGlobalContext } from "../../context/GlobalContext";
import { createCompany } from "../../api/company";
import Typography from "@mui/material/Typography/Typography";
import CompanyName from "./CompanyName";

const CompanyPage = () => {
  const [company, setCompany] = useState("");

  const queryClient = useQueryClient();

  const { companies } = useGlobalContext();

  const { mutate } = useMutation(
    async (name: string) => await createCompany(name),
    {
      onSuccess: () => queryClient.invalidateQueries("all companies"),
      onSettled: () => setCompany(""),
    }
  );

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ mr: 1, flexGrow: 1 }}
          size="medium"
          fullWidth
          placeholder="enter the company name to add"
        />
        <Button
          variant="contained"
          onClick={() => {
            if (company.length === 0) {
              return;
            }
            mutate(company);
          }}
          size="large"
        >
          add
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
          List of companies
        </Typography>
        <Divider />
        {companies.length === 0 ? (
          <Typography>you have no companies.</Typography>
        ) : (
          companies.map((c) => (
            <CompanyName name={c.name} id={c._id} key={c._id} />
          ))
        )}
      </Box>
    </div>
  );
};

export default CompanyPage;
