import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import { NavLink } from "react-router-dom";

const drawerWidth = 200;

const listItems = [
  { title: "Home", icon: <HomeIcon />, to: "/" },
  { title: "Payments", icon: <PaidIcon />, to: "/payments" },
  { title: "Shops", icon: <StorefrontIcon />, to: "/shops" },
  { title: "Collectors", icon: <FollowTheSignsIcon />, to: "/collectors" },
];

const SideNav = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {listItems.map((item) => (
          <>
            <NavLink
              to={item.to}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#f27521" : "#000000",
                  textDecoration: "none",
                };
              }}
            >
              <ListItem key={item.title} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
