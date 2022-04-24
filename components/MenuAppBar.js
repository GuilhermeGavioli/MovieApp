import Image from "next/Image";
// import * as React from 'react';
import {
  Button,
  IconButton,
  Typography,
  AppBar,
  Box,
  Toolbar,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

import companyLogo from "../public/companyLogo.ico";

import { useRouter } from "next/router";
import { useContext } from "react";
import { SidebarContext } from "./Layout/Layout";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAppBar() {
  const [sidebar, setSidebar] = useContext(SidebarContext);
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar position="static" sx={{ bgcolor: "#272727" }}>
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setSidebar(true)}
          >
            &#9776;
          </IconButton>
          <div style={{ flexGrow: 0.03 }}>
            <Image src={companyLogo} alt="logo" height={35} width={35} />
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: 17, fontWeight: 700 }}
          >
            MovieApp
          </Typography>

          <Button
            color="inherit"
            size="large"
            variant="text"
            sx={{ fontWeight: 700 }}
            onClick={() => {
              !session ? signIn("google") : signOut();
            }}
          >
            {session ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
