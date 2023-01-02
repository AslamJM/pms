import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { Outlet } from "react-router-dom";
import { appTheme } from "./themes/theme";
import Layout from "./components/layout";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
