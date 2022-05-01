import Link from "next/link";
import Image from "next/image";

import { Button, Box, Typography, Avatar, Paper, IconButton } from "@mui/material";

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
        transition: "0.06s",
        zIndex: 2,
      }}
      style={sidebar ? { width: "220px" } : { width: 0 }}
    >
      {/* <button
        
        style={{ fontWeight: 600, float: "right", borderRadius: 0, border: 'none',  backgroundColor: 'unset'}}
        onClick={closeSidebar}
      >
        X
      </button> */}
      {sidebar && session ? (
        <>
      <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, mt: 1, color: 'gray','&:hover': {bgcolor: 'unset'}}}
            onClick={closeSidebar}
          >
            &#9776;
          </IconButton>
        <Box sx={{ mt: 1, width: "100%", textAlign: "center"}}>
        <Link href={`/profile/${session?.user?.email.replace("@gmail.com", "")}`}><a><Image width="65" height="65" alt="profpic" src={session?.user?.image}
              style={{ borderRadius: '50%'}} /></a></Link>
          <Typography sx={{ fontSize: 15 }}><b>{session?.user?.name}</b></Typography>
          <Typography sx={{ fontSize: 12 }}>{session?.user?.email}</Typography>
          </Box>
          </>
      ) : (
        <></>
      )}

      { sidebar && session ? 
      <Box sx={{margin: 'auto', width: 'fit-content', mt: 2,width: '80%'}}>
        <Link href={`/profile/${session?.user?.email.replace("@gmail.com", "")}`}><a><Paper sx={{fontWeight: 600, padding: '10px 50px 10px 50px', textAlign: 'center'}}>Profile</Paper></a></Link>
        <Link href='/'><a><Paper sx={{fontWeight: 600, padding: '10px 50px 10px 50px', textAlign: 'center', mt: 2}}>About</Paper></a></Link>
        </Box>
        :
        <></>
      }

    </Box>
  );
}
