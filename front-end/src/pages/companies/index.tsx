import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createCompany } from "../../api/company";

const CompanyPage = () => {
  const [company, setCompany] = useState("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (name: string) => await createCompany(name),
    {
      onSuccess: () => queryClient.invalidateQueries("all companies"),
      onSettled: () => setCompany(""),
    }
  );

  return (
    <div>
      <Box>
        <TextField
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (company.length === 0) {
              return;
            }
            mutate(company);
          }}
        >
          add
        </Button>
      </Box>
    </div>
  );
};

export default CompanyPage;
