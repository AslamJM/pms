import { ThemeProvider, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appTheme } from "./themes/theme";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login";
import Layout from "./components/layout";

function App() {
  const { token } = useAuthContext();
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {token ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}

export default App;
