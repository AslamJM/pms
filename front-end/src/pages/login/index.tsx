import {
  Typography,
  Paper,
  Box,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { IUser } from "../../api/client";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, setLoading } = useGlobalContext();
  const { setUser, setToken } = useAuthContext();

  const api_url = import.meta.env.VITE_API_URL;
  type LoginResponse = {
    user: IUser;
    token: string;
    message?: string;
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${api_url}/users/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 400) {
        setError("invalid username or incorrect password");
        setUsername("");
        setPassword("");
        setLoading(false);
      }

      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="center"
      height="100vh"
    >
      <Paper sx={{ width: 500, p: 2 }}>
        <Typography variant="h5" sx={{ letterSpacing: 0.5, my: 1 }}>
          Log In
        </Typography>
        <Divider />
        <Box>
          <FormControl fullWidth sx={{ my: 1 }}>
            <TextField
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
              fullWidth
              error={error.length > 0}
              helperText={error}
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }}>
            <TextField
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              fullWidth
              error={error.length > 0}
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 1 }}
            onClick={() => handleLogin()}
            disabled={loading || username.length === 0 || password.length === 0}
          >
            {loading ? <CircularProgress /> : "Log In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
