import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../context/AuthContext";
import { AppBar } from "./Drawer";

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
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
      open={open}
    >
      <Toolbar>
        <IconButton
          size="large"
          onClick={() => setOpen(true)}
          color="inherit"
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          L O G O
        </Typography>
        <Box>
          <Button
            variant="text"
            color="secondary"
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
