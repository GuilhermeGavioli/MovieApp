import Link from "next/link";

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
      style={sidebar ? { width: "220px" } : { width: 0 }}
    >
      <button
        
        style={{ fontWeight: 600, float: "right", borderRadius: 0, border: 'none',  backgroundColor: 'unset'}}
        onClick={closeSidebar}
      >
        X
      </button>
      {sidebar && session ? (
        <Box sx={{ mt: 8, width: "100%", textAlign: "center"}}>
          <Avatar
            sx={{ width: 60, height: 60, margin: "auto", mb: 2 }}
            src={session?.user?.image}
          />
          <Typography sx={{ fontSize: 14 }}>{session?.user?.name}</Typography>
        </Box>
      ) : (
        <></>
      )}

      { sidebar && session ? 
      <Box sx={{margin: 'auto', width: 'fit-content', mt: 2}}>
        <Link href={`/profile/${session?.user?.email.replace("@gmail.com", "")}`}><a><Button variant="outlined" sx={{fontWeight: 600}}>My Ratings</Button></a></Link>
        </Box>
        :
        <></>
      }

    </Box>
  );
}
