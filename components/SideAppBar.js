import Link from "next/link";
import Image from "next/image";

import companyLogo from '../public/companyLogo.ico'

import { Button, Box, Typography, Avatar, Paper, IconButton } from "@mui/material";

import { useSession } from "next-auth/react";

import { useContext } from "react";
import { SidebarContext } from "./Layout/Layout";

export default function SideAppBar() {
  const [sidebar, setSidebar, closeSidebar] = useContext(SidebarContext);
  const { data: session } = useSession();

  //sidebar-items styling
  const sidebarLinks = { padding: '10px 50px 10px 50px', bgcolor: 'rgb(35,35,35)', boxShadow: '4px 3px 10px -4px gray', mt: 2}


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
        <Box sx={{ mt: 1, width: "100%", textAlign: "center", color: 'rgb(80,80,80)'}}>
        <Link href={`/profile/${session?.user?.email.replace("@gmail.com", "")}`}><a><Image width="65" height="65" alt="profpic" src={session?.user?.image}
              style={{ borderRadius: '50%'}} /></a></Link>
          <Typography sx={{ fontSize: 14 }}><b>{session?.user?.name}</b></Typography>
          <Typography sx={{ fontSize: 11 }}>{session?.user?.email}</Typography>
          </Box>
          </>
      ) : (
        <></>
      )}

      { sidebar && session ? 
        <Box sx={{ fontWeight: 600, margin: 'auto', width: 'fit-content', mt: 2, width: '92%', color: "whitesmoke", textAlign: 'center' }}>
          
          <Link href={`/profile/${session?.user?.email.replace("@gmail.com", "")}`}><a><Box sx={sidebarLinks}>Profile</Box></a></Link>
          
          <Link href='/movies/1'><a><Box sx={sidebarLinks}>Movies</Box></a></Link>

          <Link href='/'><a><Box sx={sidebarLinks}>Empty</Box></a></Link>
          
        </Box>
        :
        <></>
      }

      <Box sx={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%'
      }}>
      <Image src={companyLogo} alt="logo" height={50} width={50}
      />

      </Box>

    </Box>
  );
}
