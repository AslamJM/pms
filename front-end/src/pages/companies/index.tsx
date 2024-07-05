import { Box, Button, Divider, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { PageHeader } from "../../components/header";
import { createCompany } from "../../api/company";
import Typography from "@mui/material/Typography/Typography";
import CompanyName from "./CompanyName";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

const CompanyPage = () => {
  const [company, setCompany] = useState("");
  const { user } = useAuthContext();

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
      <PageHeader title="Companies" />
      {user?.role === "ADMIN" && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <TextField
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={{ mr: 1, flexGrow: 1 }}
            size="medium"
            fullWidth
            placeholder="Enter the company name to add"
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
      )}
      <div style={{ padding: '8px 0', fontFamily: 'Poppins' }}>
      <Paper sx={{ width: "25%", overflowY: "auto", overflowX: "hidden", mt: 1, boxShadow: 5, fontFamily: 'Poppins', p: 2, maxHeight: 450, ml: 3, borderRadius: '10px' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Poppins', textAlign: 'center', mb: 1 }}>
            List of companies
          </Typography>
            <Divider />
            {companies.length === 0 ? (
              <Typography>You have no companies.</Typography>
            ) : (
              companies.map((c) => (
                <div key={c._id}>
                <CompanyName name={c.name} id={c._id} />
                <Divider />
                </div>
              ))
            )}
        </Paper>
      </div>
    </div>
  );
};

export default CompanyPage;
