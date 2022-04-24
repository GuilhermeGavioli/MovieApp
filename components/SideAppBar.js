import { Button, Box, Typography, Avatar } from "@mui/material";

import { useSession } from "next-auth/react";

import { useContext } from "react";
import { SidebarContext } from "./Layout/Layout";

export default function SideAppBar() {
  const [sidebar, setSidebar, closeSidebar] = useContext(SidebarContext);
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: "100vh",
        bgcolor: "whitesmoke",
        position: "fixed",
        transition: "0.2s",
        zIndex: 2,
      }}
      style={sidebar ? { width: "240px" } : { width: 0 }}
    >
      <Button
        size="small"
        color="error"
        variant="contained"
        sx={{ fontWeight: 600, float: "right", borderRadius: 0, width: "100%" }}
        onClick={closeSidebar}
      >
        X
      </Button>
      {sidebar && session ? (
        <Box sx={{ mt: 8, width: "100%", textAlign: "center" }}>
          <Avatar
            sx={{ width: 60, height: 60, margin: "auto", mb: 2 }}
            src={session?.user?.image}
          />
          <Typography sx={{ fontSize: 14 }}>{session?.user?.name}</Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
