import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../context/AuthContext";
import { AppBar } from "./Drawer";
import logo from "../../assets/logo.jpg";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ open, setOpen }: Props) => {
  const { setUser, setToken } = useAuthContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        bgcolor: "white",
      }}
      open={open}
    >
      <Toolbar>
        <IconButton
          size="large"
          onClick={() => setOpen(true)}
          color="primary"
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ py: 1, flexGrow: 1 }}>
          <img src={logo} alt="" style={{ height: 50 }} />
        </Box>
        <Box>
          <Button
            variant="text"
            color="primary"
            size="large"
            onClick={() => handleLogout()}
          >
            log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
