import Box from "@mui/material/Box/Box";
import React from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Toolbar from "@mui/material/Toolbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <div>
          <Toolbar />
          <>{children}</>
        </div>
      </Box>
    </div>
  );
};

export default Layout;
