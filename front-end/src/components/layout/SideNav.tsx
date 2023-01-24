//import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import SummarizeIcon from "@mui/icons-material/Summarize";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { NavLink } from "react-router-dom";
import { Drawer, DrawerHeader } from "./Drawer";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation } from "react-router-dom";

//const drawerWidth = 200;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

let listItems = [
  { title: "Home", icon: <HomeIcon />, to: "/" },
  { title: "Payments", icon: <PaidIcon />, to: "/payments" },
  { title: "Reports", icon: <SummarizeIcon />, to: "/reports" },
  { title: "Shops", icon: <StorefrontIcon />, to: "/shops" },
  {
    title: "Collectors",
    icon: <FollowTheSignsIcon />,
    to: "/collectors",
  },
  {
    title: "Companies",
    icon: <LocationCityIcon />,
    to: "/companies",
  },
];

const SideNav = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  let location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar />
      <DrawerHeader>
        <IconButton onClick={() => setOpen(!open)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {listItems.map((item) => (
          <div key={item.title}>
            <NavLink
              to={item.to}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#BB892D" : "#000000",
                  textDecoration: "none",
                };
              }}
            >
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.to ? "#BB892D" : "#000000",
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
