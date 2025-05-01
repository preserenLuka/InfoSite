import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom"; // Correct import for useNavigate
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

const drawerWidth = 260;

function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 1300,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {location.pathname !== "/" && (
                <IconButton
                  onClick={() => navigate("/")}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1257a6",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              )}
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1257a6",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        <Box
          component={motion.div}
          initial={{ x: drawerWidth }}
          animate={{ x: 0 }}
          exit={{ x: drawerWidth }}
          transition={{ type: "tween", duration: 0.3 }}
          sx={{ height: "100%" }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Sidebar onNavigate={toggleDrawer} />
        </Box>
      </Drawer>

      {/* Main content */}
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
