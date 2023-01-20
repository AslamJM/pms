import Box from "@mui/material/Box/Box";
import React from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Toolbar from "@mui/material/Toolbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <SideNav open={open} setOpen={setOpen} />
        <div style={{ padding: "20px", flexGrow: 1 }}>
          <Toolbar />
          <>{children}</>
        </div>
      </Box>
    </div>
  );
};

export default Layout;
