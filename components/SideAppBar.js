import Link from "next/link";
import Image from "next/image";



import { Button, Box, Typography, Avatar, Paper, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useContext } from "react";
import { SidebarContext } from "./Layout/Layout";

export default function SideAppBar() {
  const [sidebar, setSidebar, closeSidebar] = useContext(SidebarContext);
  const { data: session } = useSession();
  const router = useRouter();
  //sidebar-items styling
  const sidebarLinks = { padding: '5px 50px 5px 5px',borderBottom: '1px solid rgb(35,35,35)', mt: 2, display: 'flex', justifyContent: 'start', cursor: 'pointer'}


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
              style={{ borderRadius: '50%' }} />
            </a></Link>

          <Typography sx={{ fontSize: 14 }}><b>{session?.user?.name}</b></Typography>
          <Typography sx={{ fontSize: 11 }}>{session?.user?.email}</Typography>
          </Box>
          </>
      ) : (
        <></>
      )}

<Box sx={{ fontWeight: 600, margin: 'auto', width: 'fit-content', mt: 3, width: '85%', color: "rgb(50,50,50)", textAlign: 'center',  height: 'fit-content'}}>
      { sidebar && session ? 
          <>
          
         
    
            <Box sx={{...sidebarLinks}} onClick={() => router.push(`/profile/${session?.user?.email.replace("@gmail.com", "")}`)}>
                  <PersonIcon/>
                    <Typography sx={{ml: 1}}>Profile</Typography>
            </Box>
           
            
            <Box sx={{...sidebarLinks}}onClick={() => router.push("/movies/1")}>
                    <LocalMoviesIcon/>
              <Typography sx={{ml: 1}}>Movies</Typography>
            </Box>

            <Box sx={{...sidebarLinks}}onClick={() => router.push("/")}>
                    <QuestionMarkIcon/>
              <Typography sx={{ml: 1}}>Empty</Typography>
            </Box>
            
          </>
          :
          <></>
        }
        </Box>

     
    </Box>
  );
}
