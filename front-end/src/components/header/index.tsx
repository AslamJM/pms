import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 1 }} component="em">
        /{title}/.
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
};
