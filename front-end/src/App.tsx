import { ThemeProvider, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appTheme } from "./themes/theme";

import Layout from "./components/layout";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
